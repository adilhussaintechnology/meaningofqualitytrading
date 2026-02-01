"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { categories, subcategories, newProducts, mostVisited, featuredProducts, type Category, type Subcategory, type Item } from "@/data/catalog";
import { productDetailsById, type ProductDetail, type PackagingRow, type ProductSpecification, type TechnicalSpecification } from "@/data/productDetails";
import { productImageByItemId, sliderBanners, categoryIconById, categoryThemeById, type Banner } from "@/data/assets";
import { LString } from "@/data/i18n";
import {
  Plus,
  Save,
  Package,
  Folder,
  FolderOpen,
  FileText,
  Image as ImageIcon,
  Search,
  Filter,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Loader2,
  ChevronDown,
  ChevronRight
} from "lucide-react";

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"assets" | "products" | "details" | "categories" | "subcategories">("assets");

  // Form states
  const [categoriesData, setCategoriesData] = useState<Category[]>(categories);
  const [subcategoriesData, setSubcategoriesData] = useState<Subcategory[]>(subcategories);
  const [productsData, setProductsData] = useState<Item[]>(() => {
    // Combine all products and set flags
    const all = [...newProducts, ...mostVisited, ...featuredProducts];
    const unique = all.filter((p, i, arr) => arr.findIndex(q => q.id === p.id) === i);
    return unique.map(p => ({
      ...p,
      isNew: newProducts.some(np => np.id === p.id),
      isMostVisited: mostVisited.some(mv => mv.id === p.id),
      isFeatured: featuredProducts.some(fp => fp.id === p.id),
    }));
  });
  const [productDetailsData, setProductDetailsData] = useState<Record<string, ProductDetail>>(productDetailsById);
  const [productImagesData, setProductImagesData] = useState<Record<string, string>>(productImageByItemId);
  const [sliderBannersData, setSliderBannersData] = useState<Banner[]>(sliderBanners);
  const [categoryIconData, setCategoryIconData] = useState<Record<string, string>>(categoryIconById);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [subcategorySearchTerm, setSubcategorySearchTerm] = useState("");
  const [detailsSearchTerm, setDetailsSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddSubcategoryModalOpen, setIsAddSubcategoryModalOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [editingDetails, setEditingDetails] = useState<string | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; itemId: string; itemType: string; itemName: string } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Derived products list for details tab (includes newly added items)
  const allItemsState = productsData;

  // All unique images from product details (computed per product in modal)

  // Filtered products
  const filteredProducts = productsData.filter(product => {
    const matchesSearch = product.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Paginated products
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Clear editing and reset page when filters change
  useEffect(() => {
    setEditingProduct(null);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  // Check if we're in development
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      setMessage({ type: "error", text: "Admin panel is only available in development mode" });
    }
  }, []);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const validateData = () => {
    const errors: string[] = [];

    const cats = categoriesData ?? [];
    const subs = subcategoriesData ?? [];

    const categoryIds = new Set(cats.map(c => c.id));
    const subcategoryIds = new Set(subs.map(s => s.id));

    subs.forEach(sub => {
      if (!categoryIds.has(sub.categoryId)) {
        errors.push(`Subcategory "${sub.title.en}" references invalid category "${sub.categoryId}"`);
      }
    });

    // Use productsData directly
    (productsData ?? []).forEach(product => {
      if (!categoryIds.has(product.categoryId)) {
        errors.push(`Product "${product.name.en}" references invalid category "${product.categoryId}"`);
      }
      if (product.subcategoryId && !subcategoryIds.has(product.subcategoryId)) {
        errors.push(`Product "${product.name.en}" references invalid subcategory "${product.subcategoryId}"`);
      }
      if (product.priceRange && product.priceRange.min > product.priceRange.max) {
        errors.push(`Product "${product.name.en}" has invalid price range (min > max)`);
      }
    });

    return errors;
  };

  const saveCatalog = async () => {
    const validationErrors = validateData();
    if (validationErrors.length > 0) {
      showMessage("error", `Validation errors:\n${validationErrors.join("\n")}`);
      return;
    }

    setLoading(true);
    try {
      // Safety check
      if (!productsData || !Array.isArray(productsData)) {
        console.error("Invalid productsData:", productsData);
        showMessage("error", "Products data is invalid");
        setLoading(false);
        return;
      }

      console.log("Products data length:", productsData.length);
      console.log("Sample product:", productsData[0]);

      // Helper to remove flag properties
      const removeFlags = (item: Item) => {
        const { ...rest } = item;
        return rest;
      };

      // Separate lists based on flags for backend
      const newProductsToSave = productsData
        .filter(p => p && p.isNew)
        .map(removeFlags);

      const mostVisitedToSave = productsData
        .filter(p => p && p.isMostVisited)
        .map(removeFlags);

      const featuredToSave = productsData
        .filter(p => p && p.isFeatured)
        .map(removeFlags);

      const response = await fetch("/api/admin/catalog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "updateCatalog",
          data: {
            categories: categoriesData,
            subcategories: subcategoriesData,
            newProducts: newProductsToSave,
            mostVisited: mostVisitedToSave,
            featuredProducts: featuredToSave,
            productImageByItemId: productImagesData,
          },
        }),
      });

      const result = await response.json();
      if (result.success) {
        showMessage("success", "Catalog saved successfully! Restart dev server to see changes.");
      } else {
        showMessage("error", result.error || "Failed to save catalog");
      }
    } catch (error) {
      showMessage("error", error instanceof Error ? error.message : "Failed to save");
    } finally {
      setLoading(false);
    }
  };


  const saveProductDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/catalog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "updateProductDetails",
          data: { productDetailsById: productDetailsData },
        }),
      });

      const result = await response.json();
      if (result.success) {
        showMessage("success", "Product details saved successfully! Restart dev server to see changes.");
      } else {
        showMessage("error", result.error || "Failed to save product details");
      }
    } catch (error) {
      showMessage("error", error instanceof Error ? error.message : "Failed to save");
    } finally {
      setLoading(false);
    }
  };



  const saveAssets = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/catalog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "updateAssets",
          data: { productImageByItemId: productImagesData },
        }),
      });

      const result = await response.json();
      if (result.success) {
        showMessage("success", "Assets saved successfully! Restart dev server to see changes.");
      } else {
        showMessage("error", result.error || "Failed to save assets");
      }
    } catch (error) {
      showMessage("error", error instanceof Error ? error.message : "Failed to save");
    } finally {
      setLoading(false);
    }
  };




  const saveAssetsFull = async (
    overrideBanners?: Banner[],
    overrideCategoryIcons?: Record<string, string>
  ) => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/catalog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "updateAssetsFull",
          data: {
            sliderBanners: overrideBanners ?? sliderBannersData,
            categoryIconById: overrideCategoryIcons ?? categoryIconData,
            categoryThemeById: categoryThemeById,
            productImageByItemId: productImagesData,
          },
        }),
      });

      const result = await response.json();
      if (result.success) {
        showMessage("success", "Assets saved successfully! Restart dev server to see changes.");
      } else {
        showMessage("error", result.error || "Failed to save assets");
      }
    } catch (error) {
      showMessage(
        "error",
        error instanceof Error ? error.message : "Failed to save"
      );
    } finally {
      setLoading(false);
    }
  };


  const addProduct = () => {
    const newId = `p-${Date.now()}`;
    const newProduct: Item = {
      id: newId,
      name: { en: "New Product", ar: "منتج جديد" },
      categoryId: categoriesData[0]?.id || "adhesives",
      priceRange: {
        min: 0,
        max: 0
      },
      Brand: "Sultan",
      isNew: true,
      isMostVisited: false,
      isFeatured: false,
    };

    setProductsData([newProduct, ...productsData]);

    // Add empty product detail
    setProductDetailsData({
      ...productDetailsData,
      [newId]: {},
    });

    // Add empty image mapping
    setProductImagesData({
      ...productImagesData,
      [newId]: "",
    });
  };

  const deleteProduct = (id: string) => {
    const product = productsData.find(p => p.id === id);
    if (product) {
      setProductsData(productsData.filter(p => p.id !== id));

      // Remove from details and images
      const newDetails = { ...productDetailsData };
      delete newDetails[id];
      setProductDetailsData(newDetails);

      const newImages = { ...productImagesData };
      delete newImages[id];
      setProductImagesData(newImages);
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirm) {
      if (deleteConfirm.itemType === "product") {
        deleteProduct(deleteConfirm.itemId);
      } else if (deleteConfirm.itemType === "category") {
        deleteCategory(deleteConfirm.itemId);
      } else if (deleteConfirm.itemType === "subcategory") {
        deleteSubcategory(deleteConfirm.itemId);
      }
      setDeleteConfirm(null);
    }
  };

  const updateProduct = (id: string, updates: Partial<Item>) => {
    setProductsData(productsData.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const addCategory = () => {
    const newId = `category-${Date.now()}`;
    const newCategory: Category = {
      id: newId,
      title: { en: "New Category", ar: "فئة جديدة" },
    };
    setCategoriesData([newCategory, ...categoriesData]);
  };

  const deleteCategory = (id: string) => {
    setCategoriesData(categoriesData.filter(c => c.id !== id));
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategoriesData(categoriesData.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const handleAddSubcategory = (categoryId: string) => {
    const newId = `subcategory-${Date.now()}`;
    const newSubcategory: Subcategory = {
      id: newId,
      title: { en: "New Subcategory", ar: "فئة فرعية جديدة" },
      categoryId,
    };
    setSubcategoriesData([newSubcategory, ...subcategoriesData]);

    // Move the category to the top of the list
    const categoryIndex = categoriesData.findIndex(cat => cat.id === categoryId);
    if (categoryIndex > 0) {
      const category = categoriesData[categoryIndex];
      const newCategories = [category, ...categoriesData.slice(0, categoryIndex), ...categoriesData.slice(categoryIndex + 1)];
      setCategoriesData(newCategories);
    }

    setExpandedCategories(new Set([...expandedCategories, categoryId])); // Expand the category where the new subcategory was added
    setIsAddSubcategoryModalOpen(false);
  };

  const toggleCategoryExpansion = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const deleteSubcategory = (id: string) => {
    setSubcategoriesData(subcategoriesData.filter(s => s.id !== id));
  };

  const updateSubcategory = (id: string, updates: Partial<Subcategory>) => {
    setSubcategoriesData(subcategoriesData.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  if (process.env.NODE_ENV === "production") {
    return (
      <Container className="py-10">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <h1 className="text-xl font-bold text-red-800">Admin Panel Unavailable</h1>
          <p className="mt-2 text-sm text-red-600">
            This admin panel is only available in development mode for security reasons.
          </p>
        </div>
      </Container>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container className="max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage products, categories, and product details locally
            </p>
          </div>
          {message && (
            <div
              className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium ${message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
                }`}
            >
              {message.type === "success" ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              {message.text}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-1 border-b border-gray-200 bg-white p-1 rounded-lg shadow-sm">
          <button
            onClick={() => setActiveTab("assets")}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === "assets"
              ? "bg-blue-50 text-blue-700 border border-blue-200"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
          >
            <ImageIcon className="h-4 w-4" aria-hidden="true" />
            Assets
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === "products"
              ? "bg-blue-50 text-blue-700 border border-blue-200"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
          >
            <Package className="h-4 w-4" />
            Products
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === "details"
              ? "bg-blue-50 text-blue-700 border border-blue-200"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
          >
            <FileText className="h-4 w-4" />
            Product Details
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === "categories"
              ? "bg-blue-50 text-blue-700 border border-blue-200"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
          >
            <Folder className="h-4 w-4" />
            Categories
          </button>
          <button
            onClick={() => setActiveTab("subcategories")}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === "subcategories"
              ? "bg-blue-50 text-blue-700 border border-blue-200"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
          >
            <FolderOpen className="h-4 w-4" />
            Subcategories
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">Products</h2>
              <div className="flex gap-3">
                <Button onClick={addProduct} variant="secondary" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Product
                </Button>
                <Button onClick={saveCatalog} disabled={loading} className="flex items-center gap-2">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  {loading ? "Saving..." : "Save Catalog"}
                </Button>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="sm:w-64">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                  >
                    <option value="">All Categories</option>
                    {categoriesData.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.title.en}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto relative">
                <table className="w-full min-w-[900px]">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name (EN)</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Subcategory</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Brand</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price Range</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">New</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Most Visited</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Featured</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky right-0 bg-gray-50 border-l-2 border-gray-300 shadow-lg">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paginatedProducts.map((product) => {
                      const category = categoriesData.find(c => c.id === product.categoryId);
                      const subcategory = subcategoriesData.find(s => s.id === product.subcategoryId);
                      return (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-mono text-gray-900">{product.id}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{product.name.en}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{category?.title.en || product.categoryId}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{subcategory?.title.en || "None"}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{product.Brand}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {product.priceRange ? `${product.priceRange.min} - ${product.priceRange.max}` : "N/A"}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <input
                              type="checkbox"
                              checked={product.isNew || false}
                              onChange={(e) => updateProduct(product.id, { isNew: e.target.checked })}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-4 py-3 text-center">
                            <input
                              type="checkbox"
                              checked={product.isMostVisited || false}
                              onChange={(e) => updateProduct(product.id, { isMostVisited: e.target.checked })}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-4 py-3 text-center">
                            <input
                              type="checkbox"
                              checked={product.isFeatured || false}
                              onChange={(e) => updateProduct(product.id, { isFeatured: e.target.checked })}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                          </td>
                          <td className="px-4 py-3 text-sm sticky right-0 bg-white hover:bg-white border-l-2 border-gray-300 shadow-lg">
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setEditingProduct(product.id);
                                  setIsEditModalOpen(true);
                                }}
                                className="inline-flex items-center justify-center h-8 w-8 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                                title="Edit product"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirm({
                                  isOpen: true,
                                  itemId: product.id,
                                  itemType: "product",
                                  itemName: product.name.en
                                })}
                                className="inline-flex items-center justify-center h-8 w-8 rounded-md text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                                title="Delete product"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white px-4 py-3 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    variant="outline"
                  >
                    Previous
                  </Button>
                  <span className="px-3 py-1 text-sm text-gray-600 bg-gray-50 rounded">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    variant="outline"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {/* Edit Modal */}
            <Modal
              isOpen={isEditModalOpen}
              onClose={() => {
                setIsEditModalOpen(false);
                setEditingProduct(null);
              }}
              title="Edit Product"
              size="xl"
              transparent={true}
            >
              {editingProduct && (() => {
                const product = productsData.find(p => p.id === editingProduct);
                if (!product) return null;
                const productDetail = productDetailsData[product.id] || {};
                const productImages = productDetail.images || [];
                return (
                  <ProductEditor
                    product={product}
                    categories={categoriesData}
                    subcategories={subcategoriesData}
                    onUpdate={(updates) => updateProduct(product.id, updates)}
                    onDelete={() => {
                      setDeleteConfirm({
                        isOpen: true,
                        itemId: product.id,
                        itemType: "product",
                        itemName: product.name.en
                      });
                    }}
                    image={productImagesData[product.id]}
                    onImageChange={(img) =>
                      setProductImagesData({ ...productImagesData, [product.id]: img })
                    }
                    allImages={productImages}
                  />
                );
              })()}
            </Modal>

            <div className="flex justify-end">
              <Button
                onClick={saveAssets}
                disabled={loading}
                variant="outline"
                className="flex items-center gap-2"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {loading ? "Saving..." : "Save Images"}
              </Button>
            </div>
          </div>
        )}

        {/* Add Subcategory Modal */}
        <Modal
          isOpen={isAddSubcategoryModalOpen}
          onClose={() => setIsAddSubcategoryModalOpen(false)}
          title="Add New Subcategory"
          size="sm"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Category</label>
              <div className="space-y-2">
                {categoriesData.map((category) => {
                  const theme = { bg: "bg-gray-50", text: "text-gray-700" };
                  const iconSrc = categoryIconById[category.id];
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleAddSubcategory(category.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors ${theme.bg}`}
                    >
                      {iconSrc && (
                        <Image
                          src={iconSrc}
                          alt={`${category.title.en} icon`}
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded object-cover bg-white p-0.5"
                        />
                      )}
                      <span className={`font-medium ${theme.text}`}>{category.title.en}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Modal>

        {/* Categories Tab */}
        {activeTab === "categories" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">Categories</h2>
              <div className="flex gap-3">
                <Button onClick={addCategory} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Category
                </Button>
                <Button onClick={saveCatalog} disabled={loading} className="flex items-center gap-2">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  {loading ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categoriesData.map((category) => (
                <CategoryEditor
                  key={category.id}
                  category={category}
                  productsData={productsData}
                  onUpdate={(updates) => updateCategory(category.id, updates)}
                  onDelete={() => setDeleteConfirm({
                    isOpen: true,
                    itemId: category.id,
                    itemType: "category",
                    itemName: category.title.en
                  })}
                />
              ))}
            </div>
          </div>
        )}

        {/* Subcategories Tab */}
        {activeTab === "subcategories" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">Subcategories</h2>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsAddSubcategoryModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Add Subcategory
                </button>
                <Button onClick={saveCatalog} disabled={loading} className="flex items-center gap-2">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  {loading ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search subcategories..."
                  value={subcategorySearchTerm}
                  onChange={(e) => setSubcategorySearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="space-y-6">
              {categoriesData
                .filter((category) => {
                  const categorySubcategories = subcategoriesData.filter((sub) =>
                    sub.categoryId === category.id &&
                    (sub.title.en.toLowerCase().includes(subcategorySearchTerm.toLowerCase()) ||
                      sub.title.ar.includes(subcategorySearchTerm) ||
                      sub.id.toLowerCase().includes(subcategorySearchTerm.toLowerCase()))
                  );
                  return categorySubcategories.length > 0 || subcategorySearchTerm === "";
                })
                .map((category) => {
                  const theme = { bg: "bg-gray-50", ring: "ring-gray-200", text: "text-gray-700", hoverBg: "hover:bg-gray-100", hoverRing: "hover:ring-gray-300", hoverText: "hover:text-gray-800" };
                  const iconSrc = categoryIconById[category.id];
                  const categorySubcategories = subcategoriesData.filter((sub) =>
                    sub.categoryId === category.id &&
                    (subcategorySearchTerm === "" ||
                      sub.title.en.toLowerCase().includes(subcategorySearchTerm.toLowerCase()) ||
                      sub.title.ar.includes(subcategorySearchTerm) ||
                      sub.id.toLowerCase().includes(subcategorySearchTerm.toLowerCase()))
                  );

                  return (
                    <div key={category.id} className={`rounded-xl border border-gray-200 p-6 shadow-sm ${theme.bg} ring-1 ${theme.ring}`}>
                      <div
                        className="flex items-center gap-3 mb-4 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                        onClick={() => toggleCategoryExpansion(category.id)}
                      >
                        {expandedCategories.has(category.id) ? (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-500" />
                        )}
                        {iconSrc && (
                          <Image
                            src={iconSrc}
                            alt={`${category.title.en} icon`}
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-lg object-cover bg-white p-1 shadow-sm"
                          />
                        )}
                        <div>
                          <h3 className={`text-lg font-semibold ${theme.text}`}>{category.title.en}</h3>
                          <p className="text-sm text-gray-500">{categorySubcategories.length} subcategories</p>
                        </div>
                      </div>
                      {expandedCategories.has(category.id) && (
                        categorySubcategories.length > 0 ? (
                          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <table className="w-full">
                              <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title (EN)</th>
                                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title (AR)</th>
                                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Products</th>
                                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                {categorySubcategories.map((subcategory) => {
                                  const productCount = productsData.filter(p => p.subcategoryId === subcategory.id).length;
                                  return (
                                    <tr key={subcategory.id} className="hover:bg-gray-50">
                                      <td className="px-4 py-3 text-sm font-mono text-gray-900">{subcategory.id}</td>
                                      <td className="px-4 py-3 text-sm text-gray-900">
                                        <input
                                          type="text"
                                          value={subcategory.title.en}
                                          onChange={(e) => updateSubcategory(subcategory.id, { title: { ...subcategory.title, en: e.target.value } })}
                                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                      </td>
                                      <td className="px-4 py-3 text-sm text-gray-900">
                                        <input
                                          type="text"
                                          value={subcategory.title.ar}
                                          onChange={(e) => updateSubcategory(subcategory.id, { title: { ...subcategory.title, ar: e.target.value } })}
                                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                      </td>
                                      <td className="px-4 py-3 text-center text-sm text-gray-600">{productCount}</td>
                                      <td className="px-4 py-3 text-sm">
                                        <div className="flex gap-2">
                                          <button
                                            onClick={() => setDeleteConfirm({
                                              isOpen: true,
                                              itemId: subcategory.id,
                                              itemType: "subcategory",
                                              itemName: subcategory.title.en
                                            })}
                                            className="inline-flex items-center justify-center h-8 w-8 rounded-md text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                                            title="Delete subcategory"
                                          >
                                            <Trash2 className="h-4 w-4" />
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        ) : subcategorySearchTerm === "" ? (
                          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                            <p className="text-gray-500">No subcategories in this category yet.</p>
                          </div>
                        ) : null
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Product Details Tab */}
        {activeTab === "details" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">Product Details</h2>
              <Button onClick={saveProductDetails} disabled={loading} className="flex items-center gap-2">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {loading ? "Saving..." : "Save Details"}
              </Button>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={detailsSearchTerm}
                  onChange={(e) => setDetailsSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Products List */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name (EN)</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Has Details</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {allItemsState
                      .filter((item) =>
                        item.name.en.toLowerCase().includes(detailsSearchTerm.toLowerCase()) ||
                        item.id.toLowerCase().includes(detailsSearchTerm.toLowerCase())
                      )
                      .map((item) => {
                        const category = categoriesData.find(c => c.id === item.categoryId);
                        const detail = productDetailsData[item.id] || {};
                        const hasDetails = Object.keys(detail).length > 0;
                        return (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-mono text-gray-900">{item.id}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{item.name.en}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{category?.title.en || item.categoryId}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {hasDetails ? (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Yes
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  <XCircle className="h-3 w-3 mr-1" />
                                  No
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <button
                                onClick={() => {
                                  setEditingDetails(item.id);
                                  setIsDetailsModalOpen(true);
                                }}
                                className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                              >
                                <Edit className="h-4 w-4" />
                                Edit Details
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Details Modal */}
            <Modal
              isOpen={isDetailsModalOpen}
              onClose={() => {
                setIsDetailsModalOpen(false);
                setEditingDetails(null);
              }}
              title="Edit Product Details"
              size="xl"
              transparent={true}
            >
              {editingDetails && (() => {
                const item = allItemsState.find(p => p.id === editingDetails);
                const detail = productDetailsData[editingDetails] || {};
                if (!item) return null;
                return (
                  <ProductDetailEditor
                    productName={item.name}
                    detail={detail}
                    onUpdate={(updates) =>
                      setProductDetailsData({
                        ...productDetailsData,
                        [editingDetails]: { ...detail, ...updates },
                      })
                    }
                    productId={editingDetails}
                  />
                );
              })()}
            </Modal>
          </div>
        )}

        {/* Assets Tab */}
        {activeTab === "assets" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">Assets</h2>
              <Button onClick={() => saveAssetsFull()} disabled={loading} className="flex items-center gap-2">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {loading ? "Saving..." : "Save Assets"}
              </Button>
            </div>

            {/* Slider Banners */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Slider Banners</h3>
              </div>
              <div className="mb-6 flex gap-4">
                <Button
                  onClick={() => {
                    setSliderBannersData([{ src: "", alt: "", href: undefined }, ...sliderBannersData]);
                  }}
                  variant="secondary"
                  className="flex items-center gap-2 h-8 px-3"
                >
                  <Plus className="h-4 w-4" />
                  Add Banner
                </Button>
                {/* <BannerUpload onUpload={(imagePath) => {
                  setSliderBannersData([{ src: imagePath, alt: "", href: undefined }, ...sliderBannersData]);
                }} /> */}
                <BannerUpload
                  onUpload={async (imagePath) => {
                    const nextBanners = [
                      { src: imagePath, alt: "", href: undefined },
                      ...sliderBannersData,
                    ];

                    // 1️⃣ Update UI immediately
                    setSliderBannersData(nextBanners);

                    // 2️⃣ Persist to assets.ts
                    await saveAssetsFull(nextBanners);
                  }}
                />

              </div>
              <div className="grid gap-4">
                {sliderBannersData.map((banner, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex gap-4 items-start">
                      {/* Image Preview */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden border border-gray-300 relative">
                          {banner.src ? (
                            <>
                              <Image
                                src={banner.src}
                                alt={banner.alt || "Banner preview"}
                                width={80}
                                height={80}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const img = e.currentTarget;
                                  const errorDiv = img.parentElement?.querySelector('.error-overlay') as HTMLElement;
                                  if (img && errorDiv) {
                                    img.style.display = 'none';
                                    errorDiv.style.display = 'flex';
                                  }
                                }}
                              />
                              <div className="error-overlay absolute inset-0 flex items-center justify-center text-red-500 text-xs bg-red-50 bg-opacity-80" style={{ display: 'none' }}>
                                Invalid URL
                              </div>
                            </>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                              No Image
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Form Fields */}
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Image Source</label>
                          <input
                            type="text"
                            value={banner.src}
                            onChange={(e) => {
                              const newBanners = [...sliderBannersData];
                              newBanners[index] = { ...banner, src: e.target.value };
                              setSliderBannersData(newBanners);
                            }}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="/images/sliders/banner.jpg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
                          <input
                            type="text"
                            value={banner.alt}
                            onChange={(e) => {
                              const newBanners = [...sliderBannersData];
                              newBanners[index] = { ...banner, alt: e.target.value };
                              setSliderBannersData(newBanners);
                            }}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Banner description"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Link (optional)</label>
                          <input
                            type="text"
                            value={banner.href || ""}
                            onChange={(e) => {
                              const newBanners = [...sliderBannersData];
                              newBanners[index] = { ...banner, href: e.target.value || undefined };
                              setSliderBannersData(newBanners);
                            }}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="https://example.com"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={async () => {
                          const banner = sliderBannersData[index];

                          // 1️⃣ delete image file (optional)
                          if (banner.src?.startsWith("/images/sliders/")) {
                            try {
                              await fetch("/api/admin/upload-image", {
                                method: "DELETE",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ imagePath: banner.src }),
                              });
                            } catch (e) {
                              console.error("Failed to delete image:", e);
                            }
                          }

                          // 2️⃣ compute next state
                          const nextBanners = sliderBannersData.filter((_, i) => i !== index);

                          // 3️⃣ update UI
                          setSliderBannersData(nextBanners);

                          // 4️⃣ persist EXACT SAME DATA
                          await saveAssetsFull(nextBanners);
                        }}
                        className="inline-flex items-center justify-center h-8 w-8 rounded-md text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                        title="Remove banner"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>


                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Icons */}
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Category Icons</h3>
              </div>
              <div className="mb-6 flex gap-4">
                <Button
                  onClick={() => {
                    const newId = `category-${Date.now()}`;
                    setCategoryIconData({ [newId]: "", ...categoryIconData });
                  }}
                  variant="secondary"
                  className="flex items-center gap-2 h-8 px-3"
                >
                  <Plus className="h-4 w-4" />
                  Add Icon
                </Button>
                <IconUpload
                  categories={categoriesData}
                  onUpload={async (categoryId, imagePath) => {
                    const nextIcons = {
                      [categoryId]: imagePath,
                      ...categoryIconData,
                    };

                    // 1️⃣ Update UI
                    setCategoryIconData(nextIcons);

                    // 2️⃣ Persist immediately
                    await saveAssetsFull(undefined, nextIcons);
                  }}
                />

              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries(categoryIconData).map(([categoryId, iconPath]) => (
                  <div key={categoryId} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                      {/* Icon Preview */}
                      <div className="w-12 h-12 bg-white rounded-lg border border-gray-300 flex items-center justify-center overflow-hidden relative">
                        {iconPath ? (
                          <>
                            <Image
                              src={iconPath}
                              alt={`${categoryId} icon`}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const img = e.currentTarget;
                                const errorDiv = img.parentElement?.querySelector('.error-overlay') as HTMLElement;
                                if (img && errorDiv) {
                                  img.style.display = 'none';
                                  errorDiv.style.display = 'flex';
                                }
                              }}
                            />
                            <div className="error-overlay absolute inset-0 flex items-center justify-center text-red-500 text-xs bg-red-50 bg-opacity-80" style={{ display: 'none' }}>
                              Invalid
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                            No Icon
                          </div>
                        )}
                      </div>
                      {/* Category ID */}
                      <div className="flex-1">
                        <input
                          type="text"
                          value={categoryId}
                          onChange={(e) => {
                            const newIcons = { ...categoryIconData };
                            delete newIcons[categoryId];
                            newIcons[e.target.value] = iconPath;
                            setCategoryIconData(newIcons);
                          }}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-medium bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Category ID"
                        />
                      </div>
                      {/* Remove Button */}
                      <button
                        onClick={async () => {
                          const iconPath = categoryIconData[categoryId];

                          // 1️⃣ Delete file
                          if (iconPath?.startsWith("/images/product-categories/categories-icons/")) {
                            try {
                              await fetch("/api/admin/upload-image", {
                                method: "DELETE",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ imagePath: iconPath }),
                              });
                            } catch (err) {
                              console.error("Failed to delete icon:", err);
                            }
                          }

                          // 2️⃣ Update state
                          const nextIcons = { ...categoryIconData };
                          delete nextIcons[categoryId];
                          setCategoryIconData(nextIcons);

                          // 3️⃣ Persist to assets.ts
                          await saveAssetsFull(undefined, nextIcons);
                        }}
                        className="inline-flex items-center justify-center h-8 w-8 rounded-md text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                    </div>
                    {/* Icon Path */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Icon Path</label>
                      <input
                        type="text"
                        value={iconPath}
                        onChange={(e) => {
                          setCategoryIconData({ ...categoryIconData, [categoryId]: e.target.value });
                        }}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="/images/product-categories/categories-icons/icon.png"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Confirmation Dialog */}
        <ConfirmDialog
          isOpen={deleteConfirm?.isOpen || false}
          onClose={() => setDeleteConfirm(null)}
          onConfirm={handleDeleteConfirm}
          title={`Delete ${deleteConfirm?.itemType || ""}`}
          message={`Are you sure you want to delete "${deleteConfirm?.itemName || ""}"? This action cannot be undone.`}
          confirmText="Delete"
        />
      </Container>
    </div>
  );
}

// Packaging Editor Component
function PackagingEditor({
  packaging,
  onUpdate,
}: {
  packaging: PackagingRow[];
  onUpdate: (packaging: PackagingRow[]) => void;
}) {
  const addRow = () => {
    onUpdate([...packaging, {}]);
  };

  const updateRow = (index: number, updates: Partial<PackagingRow>) => {
    const newPackaging = [...packaging];
    newPackaging[index] = { ...newPackaging[index], ...updates };
    onUpdate(newPackaging);
  };

  const removeRow = (index: number) => {
    onUpdate(packaging.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      {packaging.map((row, index) => (
        <div key={index} className="flex gap-2 items-end">
          <div className="flex-1">
            <label className="block text-xs font-medium text-muted-foreground">Stock Code</label>
            <input
              type="text"
              value={row.stockCode || ""}
              onChange={(e) => updateRow(index, { stockCode: e.target.value })}
              className="mt-1 w-full rounded border px-2 py-1 text-sm"
              placeholder="Optional"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-muted-foreground">Product Code</label>
            <input
              type="text"
              value={row.productCode || ""}
              onChange={(e) => updateRow(index, { productCode: e.target.value })}
              className="mt-1 w-full rounded border px-2 py-1 text-sm"
              placeholder="Optional"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-muted-foreground">Type</label>
            <input
              type="text"
              value={row.type || ""}
              onChange={(e) => updateRow(index, { type: e.target.value })}
              className="mt-1 w-full rounded border px-2 py-1 text-sm"
              placeholder="Optional"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-muted-foreground">Volume</label>
            <input
              type="text"
              value={row.volume || ""}
              onChange={(e) => updateRow(index, { volume: e.target.value })}
              className="mt-1 w-full rounded border px-2 py-1 text-sm"
              placeholder="e.g. 310 ml"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-muted-foreground">Box Qty</label>
            <input
              type="text"
              value={row.boxQty || ""}
              onChange={(e) => updateRow(index, { boxQty: e.target.value })}
              className="mt-1 w-full rounded border px-2 py-1 text-sm"
              placeholder="e.g. 12"
            />
          </div>
          <button
            onClick={() => removeRow(index)}
            className="rounded bg-red-100 px-2 py-1 text-xs text-red-700 hover:bg-red-200"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={addRow}
        className="rounded bg-primary px-3 py-1 text-sm text-white hover:brightness-110"
      >
        + Add Packaging
      </button>
    </div>
  );
}

function ProductSpecificationEditor({
  specs,
  onUpdate,
}: {
  specs: ProductSpecification[];
  onUpdate: (specs: ProductSpecification[]) => void;
}) {
  const addRow = () => {
    onUpdate([...specs, { specification: { en: "", ar: "" }, value: { en: "", ar: "" } }]);
  };

  const updateRow = (
    index: number,
    updates: Partial<ProductSpecification>
  ) => {
    const newSpecs = [...specs];
    newSpecs[index] = { ...newSpecs[index], ...updates };
    onUpdate(newSpecs);
  };

  const removeRow = (index: number) => {
    onUpdate(specs.filter((_, i) => i !== index));
  };

  const ensureLString = (v: string | LString): LString =>
    typeof v === "string" ? { en: v, ar: "" } : v;

  return (
    <div className="space-y-2">
      {specs.map((row, index) => {
        const spec = ensureLString(row.specification);
        const value = ensureLString(row.value);
        return (
          <div key={index} className="flex gap-2 items-end">
            <div className="flex-1 space-y-1">
              <label className="block text-xs font-medium text-muted-foreground">
                Title (EN)
              </label>
              <input
                type="text"
                value={spec.en}
                onChange={(e) =>
                  updateRow(index, { specification: { ...spec, en: e.target.value } })
                }
                className="mt-1 w-full rounded border px-2 py-1 text-sm"
                placeholder="e.g. Color"
              />
              <label className="block text-xs font-medium text-muted-foreground">
                Title (AR)
              </label>
              <input
                type="text"
                value={spec.ar}
                onChange={(e) =>
                  updateRow(index, { specification: { ...spec, ar: e.target.value } })
                }
                className="mt-1 w-full rounded border px-2 py-1 text-sm"
                placeholder="مثال: اللون"
              />
            </div>

            <div className="flex-1 space-y-1">
              <label className="block text-xs font-medium text-muted-foreground">
                Value (EN)
              </label>
              <input
                type="text"
                value={value.en}
                onChange={(e) =>
                  updateRow(index, { value: { ...value, en: e.target.value } })
                }
                className="mt-1 w-full rounded border px-2 py-1 text-sm"
                placeholder="e.g. White"
              />
              <label className="block text-xs font-medium text-muted-foreground">
                Value (AR)
              </label>
              <input
                type="text"
                value={value.ar}
                onChange={(e) =>
                  updateRow(index, { value: { ...value, ar: e.target.value } })
                }
                className="mt-1 w-full rounded border px-2 py-1 text-sm"
                placeholder="مثال: أبيض"
              />
            </div>

            <button
              onClick={() => removeRow(index)}
              className="rounded bg-red-100 px-2 py-1 text-xs text-red-700 hover:bg-red-200"
            >
              Remove
            </button>
          </div>
        );
      })}

      <button
        onClick={addRow}
        className="rounded bg-primary px-3 py-1 text-sm text-white hover:brightness-110"
      >
        + Add Product Spec
      </button>
    </div>
  );
}


function TechnicalSpecificationEditor({
  specs,
  onUpdate,
}: {
  specs: TechnicalSpecification[];
  onUpdate: (specs: TechnicalSpecification[]) => void;
}) {
  const addRow = () => {
    onUpdate([...specs, { title: { en: "", ar: "" }, description: { en: "", ar: "" } }]);
  };

  const updateRow = (
    index: number,
    updates: Partial<TechnicalSpecification>
  ) => {
    const newSpecs = [...specs];
    newSpecs[index] = { ...newSpecs[index], ...updates };
    onUpdate(newSpecs);
  };

  const removeRow = (index: number) => {
    onUpdate(specs.filter((_, i) => i !== index));
  };

  const ensureLString = (v: string | LString): LString =>
    typeof v === "string" ? { en: v, ar: "" } : v;

  return (
    <div className="space-y-2">
      {specs.map((row, index) => {
        const title = ensureLString(row.title || "");
        const description = ensureLString(row.description || "");
        return (
          <div key={index} className="flex gap-2 items-end">
            <div className="flex-1 space-y-1">
              <label className="block text-xs font-medium text-muted-foreground">
                Specification (EN)
              </label>
              <input
                type="text"
                value={title.en}
                onChange={(e) =>
                  updateRow(index, { title: { ...title, en: e.target.value } })
                }
                className="mt-1 w-full rounded border px-2 py-1 text-sm"
                placeholder="e.g. Density"
              />
              <label className="block text-xs font-medium text-muted-foreground">
                Specification (AR)
              </label>
              <input
                type="text"
                value={title.ar}
                onChange={(e) =>
                  updateRow(index, { title: { ...title, ar: e.target.value } })
                }
                className="mt-1 w-full rounded border px-2 py-1 text-sm"
                placeholder="مثال: الكثافة"
              />
            </div>

            <div className="flex-[2] space-y-1">
              <label className="block text-xs font-medium text-muted-foreground">
                Value (EN)
              </label>
              <input
                type="text"
                value={description.en}
                onChange={(e) =>
                  updateRow(index, { description: { ...description, en: e.target.value } })
                }
                className="mt-1 w-full rounded border px-2 py-1 text-sm"
                placeholder="e.g. 1.2 g/cm³ at 25°C"
              />
              <label className="block text-xs font-medium text-muted-foreground">
                Value (AR)
              </label>
              <input
                type="text"
                value={description.ar}
                onChange={(e) =>
                  updateRow(index, { description: { ...description, ar: e.target.value } })
                }
                className="mt-1 w-full rounded border px-2 py-1 text-sm"
                placeholder="مثال: 1.2 جم/سم³ عند 25°م"
              />
            </div>

            <button
              onClick={() => removeRow(index)}
              className="rounded bg-red-100 px-2 py-1 text-xs text-red-700 hover:bg-red-200"
            >
              Remove
            </button>
          </div>
        );
      })}

      <button
        onClick={addRow}
        className="rounded bg-primary px-3 py-1 text-sm text-white hover:brightness-110"
      >
        + Add Technical Spec
      </button>
    </div>
  );
}

function ImagesEditor({
  images,
  onUpdate,
  productId,
}: {
  images: string[];
  onUpdate: (images: string[]) => void;
  productId: string;
}) {
  const [uploading, setUploading] = useState(false);

  const addImage = () => {
    onUpdate([...images, ""]);
  };

  const updateImage = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    onUpdate(newImages);
  };

  const removeImage = async (index: number) => {
    const imageToRemove = images[index];
    if (imageToRemove && imageToRemove.startsWith("/images/")) {
      try {
        await fetch('/api/admin/upload-image', {
          method: 'DELETE',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imagePath: imageToRemove }),
        });
      } catch (error) {
        console.error("Failed to delete image file:", error);
      }
    }
    onUpdate(images.filter((_, i) => i !== index));
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'product');
      formData.append('productId', productId);

      const response = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        onUpdate([...images, result.imagePath]);
      } else {
        alert(`Upload failed: ${result.error}`);
      }
    } catch (error) {
      alert(`Upload error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* File Upload Section */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
        <div className="text-center">
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="mt-2 block text-sm font-medium text-gray-900">
                {uploading ? 'Uploading...' : 'Upload a new image'}
              </span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleFileUpload(file);
                  }
                }}
                disabled={uploading}
              />
            </label>
            <p className="mt-1 text-xs text-gray-500">
              PNG, JPG, GIF up to 5MB
            </p>
          </div>
        </div>
      </div>

      {/* Existing Images */}
      {images.length > 0 && (
        <div className="space-y-2">
          <h5 className="text-sm font-medium text-gray-700">Current Images</h5>
          {images.map((image, index) => (
            <div key={index} className="flex gap-2 items-end">
              <div className="flex-1">
                <label className="block text-xs font-medium text-muted-foreground">Image URL {index + 1}</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => updateImage(index, e.target.value)}
                  className="mt-1 w-full rounded border px-2 py-1 text-sm"
                  placeholder="/images/all-products/category/product.png"
                />
              </div>
              <button
                onClick={() => removeImage(index)}
                className="rounded bg-red-100 px-2 py-1 text-xs text-red-700 hover:bg-red-200"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={addImage}
        className="rounded bg-primary px-3 py-1 text-sm text-white hover:brightness-110"
      >
        + Add Image URL Manually
      </button>
    </div>
  );
}

// Banner Upload Component
function BannerUpload({ onUpload }: { onUpload: (imagePath: string) => void }) {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'banner');

      const response = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        onUpload(result.imagePath);
      } else {
        alert(`Upload failed: ${result.error}`);
      }
    } catch (error) {
      alert(`Upload error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
      <div className="text-center">
        <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
        <div className="mt-2">
          <label htmlFor="banner-upload" className="cursor-pointer">
            <span className="block text-sm font-medium text-gray-900">
              {uploading ? 'Uploading...' : 'Upload Banner'}
            </span>
            <input
              id="banner-upload"
              name="banner-upload"
              type="file"
              className="sr-only"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleFileUpload(file);
                }
              }}
              disabled={uploading}
            />
          </label>
          <p className="mt-1 text-xs text-gray-500">
            PNG, JPG, GIF up to 5MB
          </p>
        </div>
      </div>
    </div>
  );
}

// Icon Upload Component
function IconUpload({ categories, onUpload }: { categories: Category[]; onUpload: (categoryId: string, imagePath: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    if (!selectedCategory) {
      alert('Please select a category first');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'icon');
      formData.append('categoryId', selectedCategory);

      const response = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        onUpload(selectedCategory, result.imagePath);
        setSelectedCategory(""); // Reset
      } else {
        alert(`Upload failed: ${result.error}`);
      }
    } catch (error) {
      alert(`Upload error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
      <div className="text-center">
        <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
        <div className="mt-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title.en}
              </option>
            ))}
          </select>
          <label htmlFor="icon-upload" className="cursor-pointer">
            <span className="block text-sm font-medium text-gray-900">
              {uploading ? 'Uploading...' : 'Upload Icon'}
            </span>
            <input
              id="icon-upload"
              name="icon-upload"
              type="file"
              className="sr-only"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleFileUpload(file);
                }
              }}
              disabled={uploading || !selectedCategory}
            />
          </label>
          <p className="mt-1 text-xs text-gray-500">
            PNG, JPG, GIF up to 5MB
          </p>
        </div>
      </div>
    </div>
  );
}

// Product Editor Component
function ProductEditor({
  product,
  categories,
  subcategories,
  onUpdate,
  onDelete,
  image,
  onImageChange,
  allImages,
}: {
  product: Item;
  categories: Category[];
  subcategories: Subcategory[];
  onUpdate: (updates: Partial<Item>) => void;
  onDelete: () => void;
  image?: string;
  onImageChange: (img: string) => void;
  allImages: string[];
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
          <input
            type="text"
            value={product.id}
            onChange={(e) => onUpdate({ id: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Lists</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={product.isNew || false}
                onChange={(e) => onUpdate({ isNew: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">New Products</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={product.isMostVisited || false}
                onChange={(e) => onUpdate({ isMostVisited: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Most Visited</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={product.isFeatured || false}
                onChange={(e) => onUpdate({ isFeatured: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Featured</span>
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={product.categoryId}
            onChange={(e) => onUpdate({ categoryId: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title.en}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name (EN)</label>
          <input
            type="text"
            value={product.name.en}
            onChange={(e) => onUpdate({ name: { ...product.name, en: e.target.value } })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name (AR)</label>
          <input
            type="text"
            value={product.name.ar}
            onChange={(e) => onUpdate({ name: { ...product.name, ar: e.target.value } })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
          <input
            type="text"
            value={product.Brand}
            onChange={(e) => onUpdate({ Brand: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Image Path</label>
          <select
            value={image || ""}
            onChange={(e) => onImageChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select an image...</option>
            {Array.from(new Set([...allImages, image].filter(Boolean))).map(img => (
              <option key={img} value={img}>{img}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
          <input
            type="number"
            value={product.priceRange?.min || ""}
            onChange={(e) =>
              onUpdate({
                priceRange: {
                  min: Number(e.target.value) || 0,
                  max: product.priceRange?.max || 0,
                },
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
          <input
            type="number"
            value={product.priceRange?.max || ""}
            onChange={(e) =>
              onUpdate({
                priceRange: {
                  min: product.priceRange?.min || 0,
                  max: Number(e.target.value) || 0,
                },
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
          <select
            value={product.subcategoryId || ""}
            onChange={(e) => onUpdate({ subcategoryId: e.target.value || undefined })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">None</option>
            {subcategories
              .filter((sub) => sub.categoryId === product.categoryId)
              .map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.title.en}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="flex justify-end pt-4 border-t border-gray-200">
        <Button
          onClick={onDelete}
          variant="destructive"
          className="flex items-center gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Delete Product
        </Button>
      </div>
    </div>
  );
}

// Category Editor Component
function CategoryEditor({
  category,
  productsData,
  onUpdate,
  onDelete,
}: {
  category: Category;
  productsData: Item[];
  onUpdate: (updates: Partial<Category>) => void;
  onDelete: () => void;
}) {
  const theme = { bg: "bg-gray-50", ring: "ring-gray-200", text: "text-gray-700", hoverBg: "hover:bg-gray-100", hoverRing: "hover:ring-gray-300", hoverText: "hover:text-gray-800" };
  const iconSrc = categoryIconById[category.id];
  const productCount = productsData.filter(p => p.categoryId === category.id).length;

  return (
    <div className={`group relative bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 ${theme.bg} hover:${theme.hoverBg} ring-1 ${theme.ring} hover:${theme.hoverRing}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={`${category.title.en} icon`}
              width={40}
              height={40}
              className="w-10 h-10 rounded-lg object-cover bg-white p-1 shadow-sm"
            />
          )}
          <div>
            <h3 className={`text-lg font-semibold ${theme.text} group-hover:${theme.hoverText}`}>{category.title.en}</h3>
            <p className="text-sm text-gray-500">{productCount} products</p>
          </div>
        </div>
        <button
          onClick={onDelete}
          className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
          <input
            type="text"
            value={category.id}
            onChange={(e) => onUpdate({ id: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title (EN)</label>
            <input
              type="text"
              value={category.title.en}
              onChange={(e) => onUpdate({ title: { ...category.title, en: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title (AR)</label>
            <input
              type="text"
              value={category.title.ar}
              onChange={(e) => onUpdate({ title: { ...category.title, ar: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (EN)</label>
            <textarea
              value={category.desc?.en || ""}
              onChange={(e) => onUpdate({ desc: { en: e.target.value, ar: category.desc?.ar || "" } })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (AR)</label>
            <textarea
              value={category.desc?.ar || ""}
              onChange={(e) => onUpdate({ desc: { en: category.desc?.en || "", ar: e.target.value } })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
}

// Subcategory Editor Component
// function SubcategoryEditor({
//   subcategory,
//   categories,
//   productsData,
//   onUpdate,
//   onDelete,
// }: {
//   subcategory: Subcategory;
//   categories: Category[];
//   productsData: Item[];
//   onUpdate: (updates: Partial<Subcategory>) => void;
//   onDelete: () => void;
// }) {
//   const productCount = productsData.filter(p => p.subcategoryId === subcategory.id).length;

//   return (
//     <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
//       <div className="flex items-center justify-between mb-3">
//         <div className="flex items-center gap-2">
//           <h4 className="font-medium text-gray-900">{subcategory.title.en}</h4>
//           <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{productCount} products</span>
//         </div>
//         <button
//           onClick={onDelete}
//           className="text-red-600 hover:text-red-700 hover:bg-red-50 h-7 w-7 p-0 rounded-md flex items-center justify-center"
//         >
//           <Trash2 className="h-4 w-4" />
//         </button>
//       </div>
//       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <div>
//           <label className="block text-xs font-medium text-gray-700 mb-1">ID</label>
//           <input
//             type="text"
//             value={subcategory.id}
//             onChange={(e) => onUpdate({ id: e.target.value })}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
//           <select
//             value={subcategory.categoryId}
//             onChange={(e) => onUpdate({ categoryId: e.target.value })}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           >
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.id}>
//                 {cat.title.en}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="block text-xs font-medium text-gray-700 mb-1">Title (EN)</label>
//           <input
//             type="text"
//             value={subcategory.title.en}
//             onChange={(e) => onUpdate({ title: { ...subcategory.title, en: e.target.value } })}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-xs font-medium text-gray-700 mb-1">Title (AR)</label>
//           <input
//             type="text"
//             value={subcategory.title.ar}
//             onChange={(e) => onUpdate({ title: { ...subcategory.title, ar: e.target.value } })}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// Product Detail Editor Component

function ProductDetailEditor({
  productName,
  detail,
  onUpdate,
  productId,
}: {
  productName: { en: string; ar: string };
  detail: ProductDetail;
  onUpdate: (updates: Partial<ProductDetail>) => void;
  productId: string;
}) {
  const descEn = typeof detail.description === "string" ? detail.description : detail.description?.en || "";
  const descAr = typeof detail.description === "string" ? "" : detail.description?.ar || "";

  const propsEn = detail.properties?.[0] ? (typeof detail.properties[0] === "string" ? detail.properties[0] : detail.properties[0].en || "") : "";
  const propsAr = detail.properties?.[0] ? (typeof detail.properties[0] === "string" ? "" : detail.properties[0].ar || "") : "";

  // const appsEn = (detail.applications ?? []).map((a) => (typeof a === "string" ? a : a.en || "")).join("\n");
  // const appsAr = (detail.applications ?? []).map((a) => (typeof a === "string" ? "" : a.ar || "")).join("\n");

  // Local state for use cases, ignoring empty entries
  const [appsEnLocal, setAppsEnLocal] = useState(
    (detail.applications ?? [])
      .filter((a) => (typeof a === "string" ? a.trim() !== "" : (a.en || "").trim() !== ""))
      .map((a) => (typeof a === "string" ? a : a.en || ""))
      .join("\n")
  );

  const [appsArLocal, setAppsArLocal] = useState(
    (detail.applications ?? [])
      .filter((a) => (typeof a === "string" ? a.trim() !== "" : (a.ar || "").trim() !== ""))
      .map((a) => (typeof a === "string" ? "" : a.ar || ""))
      .join("\n")
  );

  // Sync if parent detail changes
  useEffect(() => {
    setAppsEnLocal(
      (detail.applications ?? [])
        .filter((a) => (typeof a === "string" ? a.trim() !== "" : (a.en || "").trim() !== ""))
        .map((a) => (typeof a === "string" ? a : a.en || ""))
        .join("\n")
    );
    setAppsArLocal(
      (detail.applications ?? [])
        .filter((a) => (typeof a === "string" ? a.trim() !== "" : (a.ar || "").trim() !== ""))
        .map((a) => (typeof a === "string" ? "" : a.ar || ""))
        .join("\n")
    );
  }, [detail.applications]);


  const mergeDualList = (enText: string, arText: string) => {
    const enLines = enText.split("\n");
    const arLines = arText.split("\n");
    const max = Math.max(enLines.length, arLines.length);
    const result: Array<{ en: string; ar: string }> = [];
    for (let i = 0; i < max; i++) {
      const en = enLines[i] || "";
      const ar = arLines[i] || "";
      result.push({ en, ar });
    }
    return result;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{productName.en}</h3>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={detail.isNew || false}
            onChange={(e) => onUpdate({ isNew: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Mark as New Product</span>
        </label>
      </div>
      <div className="space-y-8">
        {/* Description Section */}
        <div className="border-b border-gray-200 pb-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Description</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">English</label>
              <textarea
                value={descEn}
                onChange={(e) => onUpdate({ description: { en: e.target.value, ar: descAr } })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="Enter product description in English"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Arabic</label>
              <textarea
                value={descAr}
                onChange={(e) => onUpdate({ description: { en: descEn, ar: e.target.value } })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="أدخل وصف المنتج باللغة العربية"
              />
            </div>
          </div>
        </div>

        {/* Product Overview Section */}
        <div className="border-b border-gray-200 pb-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Product Overview</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">English</label>
              <textarea
                value={propsEn}
                onChange={(e) =>
                  onUpdate({
                    properties: [{ en: e.target.value, ar: propsAr }],
                  })
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="Enter product overview in English"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Arabic</label>
              <textarea
                value={propsAr}
                onChange={(e) =>
                  onUpdate({
                    properties: [{ en: propsEn, ar: e.target.value }],
                  })
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="أدخل نظرة عامة على المنتج باللغة العربية"
              />
            </div>
          </div>
        </div>
        <div className="border-b border-gray-200 pb-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Use Cases</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">English (one per line)</label>
              <textarea
                value={appsEnLocal}
                onChange={(e) => setAppsEnLocal(e.target.value)}
                onBlur={() => onUpdate({ applications: mergeDualList(appsEnLocal, appsArLocal) })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="Enter use cases in English"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Arabic (one per line)</label>
              <textarea
                value={appsArLocal}
                onChange={(e) => setAppsArLocal(e.target.value)}
                onBlur={() => onUpdate({ applications: mergeDualList(appsEnLocal, appsArLocal) })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="أدخل حالات الاستخدام باللغة العربية"
              />
            </div>
          </div>
        </div>

        {/* Specifications Section */}
        <div className="border-b border-gray-200 pb-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Product Specifications</h4>
          <ProductSpecificationEditor
            specs={detail.productSpecs || []}
            onUpdate={(productSpecs) => onUpdate({ productSpecs })}
          />
        </div>

        <div className="border-b border-gray-200 pb-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Technical Specifications</h4>
          <TechnicalSpecificationEditor
            specs={detail.technicalSpecs || []}
            onUpdate={(technicalSpecs) => onUpdate({ technicalSpecs })}
          />
        </div>

        {/* Packaging Section */}
        <div className="border-b border-gray-200 pb-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Packaging</h4>
          <PackagingEditor
            packaging={detail.packaging || []}
            onUpdate={(packaging) => onUpdate({ packaging })}
          />
        </div>

        {/* Images Section */}
        <div className="border-b border-gray-200 pb-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">Images</h4>
          <ImagesEditor
            images={detail.images || []}
            onUpdate={(images) => onUpdate({ images })}
            productId={productId}
          />
        </div>

        {/* Documents Section */}
        <div>
          <h4 className="text-md font-medium text-gray-900 mb-4">Documents</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">TDS URL</label>
              <input
                type="text"
                value={detail.tdsUrl || ""}
                onChange={(e) => onUpdate({ tdsUrl: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/tds.pdf"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SDS URL</label>
              <input
                type="text"
                value={detail.sdsUrl || ""}
                onChange={(e) => onUpdate({ sdsUrl: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/sds.pdf"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



