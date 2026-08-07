import { Label } from "@headlessui/react";
function FormLabel({ label }) {
  return (
    <>
    <Label className="text-gray-400 placeholder:italic text-sm">
      {label}
    </Label>
    </>
  );
}

export default FormLabel;
