import { Label } from "@headlessui/react";
function FormLabel({ label }) {
  return (
    <>
    <Label className="text-gray-800 placeholder:italic text-sm">
      {label}
    </Label>
    </>
  );
}

export default FormLabel;
