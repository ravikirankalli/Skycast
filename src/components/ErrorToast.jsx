import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function ErrorToast({ message, onClose }) {
  return (
    <div className="flex items-start justify-between gap-4 p-3 rounded-lg bg-red-600/20 border border-red-600/30 text-red-100">
      <div className="text-sm">{message}</div>
      <button onClick={onClose} aria-label="close" className="p-1">
        <XMarkIcon className="w-5 h-5 text-red-200" />
      </button>
    </div>
  );
}
