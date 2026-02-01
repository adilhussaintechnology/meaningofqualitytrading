// import { NextRequest, NextResponse } from "next/server";
// import { writeFileSync, mkdirSync } from "fs";
// import { join, extname } from "path";
// import { categories, subcategories, newProducts, mostVisited, featuredProducts, allItems } from "@/data/catalog";

// // Note: This route only works in development mode and is excluded from static builds
// export const runtime = "nodejs";
// export const dynamic = "force-static";

// // Security: Only allow in development/local
// const isStaticExport = process.env.NEXT_PHASE === "phase-production-build";
// const isProduction = process.env.NODE_ENV === "production";

// if (isStaticExport || (isProduction && !process.env.NEXT_DEV)) {
//   // During static export, this route shouldn't be called
// }


// const PUBLIC_DIR = join(process.cwd(), "public");
// const IMAGES_DIR = join(PUBLIC_DIR, "images", "all-products");

// // Helper to delete file if exists
// function deleteFileIfExists(filePath: string) {
//   try {
//     const fs = require("fs");
//     if (fs.existsSync(filePath)) {
//       fs.unlinkSync(filePath);
//     }
//   } catch (error) {
//     console.error("Error deleting file:", error);
//   }
// }

// export async function POST(request: NextRequest) {
//   // Security check
//   if (isProduction && !process.env.NEXT_DEV) {
//     return NextResponse.json(
//       { success: false, error: "Upload API is only available in development mode" },
//       { status: 403 }
//     );
//   }

//   try {
//     const formData = await request.formData();
//     const file = formData.get("file") as File;
//     const type = formData.get("type") as string; // 'product', 'banner', or 'icon'
//     const productId = formData.get("productId") as string;
//     const categoryId = formData.get("categoryId") as string;

//     if (!file || !type) {
//       return NextResponse.json(
//         { success: false, error: "File and type are required" },
//         { status: 400 }
//       );
//     }

//     let folderPath: string;
//     let urlPath: string;
//     let filename: string;

//     if (type === 'product') {
//       if (!productId) {
//         return NextResponse.json(
//           { success: false, error: "productId is required for product uploads" },
//           { status: 400 }
//         );
//       }

//       // Find the product to determine category/subcategory
//       const product = allItems.find(p => p.id === productId);
//       if (!product) {
//         return NextResponse.json(
//           { success: false, error: "Product not found" },
//           { status: 404 }
//         );
//       }

//       // Get category and subcategory names
//       const category = categories.find(c => c.id === product.categoryId);
//       const subcategory = subcategories.find(s => s.id === product.subcategoryId);

//       if (!category) {
//         return NextResponse.json(
//           { success: false, error: "Category not found" },
//           { status: 404 }
//         );
//       }

//       // Create folder path: /images/all-products/{category}/{subcategory}/
//       folderPath = join(IMAGES_DIR, category.id);
//       if (subcategory) {
//         folderPath = join(folderPath, subcategory.id);
//       }

//       // Generate unique filename
//       const timestamp = Date.now();
//       const random = Math.random().toString(36).substring(2, 8);
//       const extension = extname(file.name) || ".png";
//       filename = `${productId}_${timestamp}_${random}${extension}`;

//       // Generate public URL path
//       urlPath = `/images/all-products/${category.id}`;
//       if (subcategory) {
//         urlPath += `/${subcategory.id}`;
//       }
//       urlPath += `/${filename}`;

//     } else if (type === 'banner') {
//       folderPath = join(PUBLIC_DIR, "images", "sliders");

//       // Generate unique filename
//       const timestamp = Date.now();
//       const random = Math.random().toString(36).substring(2, 8);
//       const extension = extname(file.name) || ".png";
//       filename = `banner_${timestamp}_${random}${extension}`;

//       urlPath = `/images/sliders/${filename}`;

//     } else if (type === 'icon') {
//       if (!categoryId) {
//         return NextResponse.json(
//           { success: false, error: "categoryId is required for icon uploads" },
//           { status: 400 }
//         );
//       }

//       folderPath = join(PUBLIC_DIR, "images", "product-categories", "categories-icons");

//       // Generate unique filename
//       const timestamp = Date.now();
//       const random = Math.random().toString(36).substring(2, 8);
//       const extension = extname(file.name) || ".png";
//       filename = `${categoryId}_${timestamp}_${random}${extension}`;

//       urlPath = `/images/product-categories/categories-icons/${filename}`;

//     } else {
//       return NextResponse.json(
//         { success: false, error: "Invalid type. Must be 'product', 'banner', or 'icon'" },
//         { status: 400 }
//       );
//     }

//     // Ensure directory exists
//     mkdirSync(folderPath, { recursive: true });

//     // Full file path
//     const filePath = join(folderPath, filename);

//     // Convert file to buffer and save
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);
//     writeFileSync(filePath, buffer);

//     return NextResponse.json({
//       success: true,
//       imagePath: urlPath,
//       message: "Image uploaded successfully"
//     });

//   } catch (error) {
//     console.error("Upload error:", error);
//     return NextResponse.json(
//       { success: false, error: error instanceof Error ? error.message : "Upload failed" },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(request: NextRequest) {
//   // Security check
//   if (isProduction && !process.env.NEXT_DEV) {
//     return NextResponse.json(
//       { success: false, error: "Delete API is only available in development mode" },
//       { status: 403 }
//     );
//   }

//   try {
//     const { imagePath } = await request.json();

//     if (!imagePath) {
//       return NextResponse.json(
//         { success: false, error: "imagePath is required" },
//         { status: 400 }
//       );
//     }

//     // Ensure it's a valid path within public/images
//     if (!imagePath.startsWith("/images/")) {
//       return NextResponse.json(
//         { success: false, error: "Invalid image path" },
//         { status: 400 }
//       );
//     }

//     const filePath = join(PUBLIC_DIR, imagePath);
//     deleteFileIfExists(filePath);

//     return NextResponse.json({
//       success: true,
//       message: "Image deleted successfully"
//     });

//   } catch (error) {
//     console.error("Delete error:", error);
//     return NextResponse.json(
//       { success: false, error: error instanceof Error ? error.message : "Delete failed" },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { writeFileSync, mkdirSync, existsSync, unlinkSync } from "fs";
import { join, extname } from "path";
import { categories, subcategories, allItems } from "@/data/catalog"; // removed unused imports

// Note: This route only works in development mode and is excluded from static builds
export const runtime = "nodejs";
export const dynamic = "force-static";

// Security: Only allow in development/local
const isStaticExport = process.env.NEXT_PHASE === "phase-production-build";
const isProduction = process.env.NODE_ENV === "production";

if (isStaticExport || (isProduction && !process.env.NEXT_DEV)) {
  // During static export, this route shouldn't be called
}

const PUBLIC_DIR = join(process.cwd(), "public");
const IMAGES_DIR = join(PUBLIC_DIR, "images", "all-products");

// Helper to delete file if exists
function deleteFileIfExists(filePath: string) {
  try {
    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }
  } catch (error) {
    console.error("Error deleting file:", error);
  }
}

export async function POST(request: NextRequest) {
  if (isProduction && !process.env.NEXT_DEV) {
    return NextResponse.json(
      { success: false, error: "Upload API is only available in development mode" },
      { status: 403 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const type = formData.get("type") as string; // 'product', 'banner', or 'icon'
    const productId = formData.get("productId") as string;
    const categoryId = formData.get("categoryId") as string;

    if (!file || !type) {
      return NextResponse.json(
        { success: false, error: "File and type are required" },
        { status: 400 }
      );
    }

    let folderPath: string;
    let urlPath: string;
    let filename: string;
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const extension = extname(file.name) || ".png";

    if (type === "product") {
      if (!productId) {
        return NextResponse.json(
          { success: false, error: "productId is required for product uploads" },
          { status: 400 }
        );
      }

      const product = allItems.find((p) => p.id === productId);
      if (!product) {
        return NextResponse.json(
          { success: false, error: "Product not found" },
          { status: 404 }
        );
      }

      const category = categories.find((c) => c.id === product.categoryId);
      const subcategory = subcategories.find((s) => s.id === product.subcategoryId);

      if (!category) {
        return NextResponse.json(
          { success: false, error: "Category not found" },
          { status: 404 }
        );
      }

      folderPath = join(IMAGES_DIR, category.id);
      if (subcategory) folderPath = join(folderPath, subcategory.id);

      filename = `${productId}_${timestamp}_${random}${extension}`;
      urlPath = `/images/all-products/${category.id}`;
      if (subcategory) urlPath += `/${subcategory.id}`;
      urlPath += `/${filename}`;
    } else if (type === "banner") {
      folderPath = join(PUBLIC_DIR, "images", "sliders");
      filename = `banner_${timestamp}_${random}${extension}`;
      urlPath = `/images/sliders/${filename}`;
    } else if (type === "icon") {
      if (!categoryId) {
        return NextResponse.json(
          { success: false, error: "categoryId is required for icon uploads" },
          { status: 400 }
        );
      }
      folderPath = join(PUBLIC_DIR, "images", "product-categories", "categories-icons");
      filename = `${categoryId}_${timestamp}_${random}${extension}`;
      urlPath = `/images/product-categories/categories-icons/${filename}`;
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid type. Must be 'product', 'banner', or 'icon'" },
        { status: 400 }
      );
    }

    mkdirSync(folderPath, { recursive: true });
    const bytes = await file.arrayBuffer();
    writeFileSync(join(folderPath, filename), Buffer.from(bytes));

    return NextResponse.json({ success: true, imagePath: urlPath, message: "Image uploaded successfully" });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (isProduction && !process.env.NEXT_DEV) {
    return NextResponse.json(
      { success: false, error: "Delete API is only available in development mode" },
      { status: 403 }
    );
  }

  try {
    const { imagePath } = await request.json();
    if (!imagePath) {
      return NextResponse.json({ success: false, error: "imagePath is required" }, { status: 400 });
    }

    if (!imagePath.startsWith("/images/")) {
      return NextResponse.json({ success: false, error: "Invalid image path" }, { status: 400 });
    }

    deleteFileIfExists(join(PUBLIC_DIR, imagePath));

    return NextResponse.json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Delete failed" },
      { status: 500 }
    );
  }
}
