"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  transparent?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  transparent = false,
}: ModalProps) {
useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      // Only handle Escape key, ignore all other keys
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        transparent ? "bg-transparent" : "bg-black bg-opacity-50"
      }`}
      onClick={onClose} // click outside modal closes it
    >
<div
        className={`w-full ${sizeClasses[size]} bg-white rounded-lg shadow-xl max-h-[90vh] overflow-hidden`}
        onClick={(e) => e.stopPropagation()} // stop clicks inside modal
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <Button
            onClick={onClose}
            variant="ghost"
            className="text-gray-600 hover:text-gray-800 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">{children}</div>
      </div>
    </div>
  );
}
