import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

type AlertProp = {
  alert: string;
  degree: string;
};

/** Alert component displays message with dynamic background color */
export default function Alert({ alert, degree }: AlertProp) {
  return (
    <>
      <div className={`rounded-md bg-${degree}-50`}>
        <div className="flex items-end">
          <div className="flex-shrink-0">
            <ExclamationTriangleIcon
              className={`h-5 w-5 text-${degree}-400`}
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            {/* <h3 className={`text-sm font-medium text-${degree}-800`}>Attention needed</h3> */}
            <div className={`mt-2 text-sm text-${degree}-700`}>
              <p>{alert}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
