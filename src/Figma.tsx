import React from "react";

const AddRecipeEmpty = () => (
  <div className="w-[893px] h-[398px] rounded-[1.25rem] border border-black bg-[#f0f2f4]">
    <div className="flex items-center pl-[0.5625rem] pr-[17.3125rem] p-0 w-[413px] rounded-[0.3125rem] border-2 border-gray-300 flex-shrink-0 w-[7.9375rem] text-[#67686a] font-['Outfit'] text-xs font-medium leading-[44px]">
      Awesome Recipe name
    </div>
    <div className="textarea_field flex flex-col flex-shrink-0 items-start w-[845px] h-28">
      <div className="self-stretch text-[#1e1e1e] font-['Outfit'] text-[var(--sds-typography-body-size-medium)] font-[var(--sds-typography-body-font-weight-regular)] leading-[140%]">
        Notes:
      </div>
      <div className="flex items-start self-stretch pt-[var(--sds-size-space-300)] pb-[var(--sds-size-space-300)] pl-[var(--sds-size-space-400)] pr-[var(--sds-size-space-400)] py-3 px-4 min-w-[15rem] min-h-[5rem] rounded-lg border-[var(--sds-size-stroke-border)] border-[#d9d9d9] bg-[#f0f2f4]">
        <div className="value text-[#5d5e60] font-['Outfit'] text-[var(--sds-typography-body-size-medium)] font-[var(--sds-typography-body-font-weight-regular)] leading-[140%]">
          Serve in coup...
        </div>
        <svg
          width={8}
          height={8}
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.523 0.353516L0.353516 6.523M6.98064 3.89589L3.8959 6.98063"
            stroke="#B3B3B3"
          />
        </svg>
      </div>
    </div>
    <div className="ingredients_section flex flex-shrink-0 justify-center items-start pt-[0.8125rem] pb-[0.8125rem] px-2 w-[412px] h-[7.5625rem] rounded-[0.3125rem] border-2 border-gray-300">
      <div className="flex flex-shrink-0 items-center w-[22.25rem] h-8 rounded-[0.3125rem]">
        <div className="item_input flex items-center pl-[0.5625rem] pr-[5.25rem] p-0 rounded-[0.3125rem] border border-gray-300 text-[#5d5e61] font-['Outfit'] text-xs font-medium leading-[44px]">
          Item
        </div>
        <div className="unit_input flex items-center pr-[4.9375rem] py-0 pl-2 rounded-[0.3125rem] border border-gray-300 text-[#5d5e60] font-['Outfit'] text-xs font-medium leading-[44px]">
          value
        </div>
        <div className="amount_input flex items-center pr-[5.4375rem] py-0 pl-2 rounded-[0.3125rem] border border-gray-300 text-[#5d5e60] font-['Outfit'] text-xs font-medium leading-[44px]">
          unit
        </div>
      </div>
      <svg
        width={35}
        height={32}
        viewBox="0 0 35 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.5 6.66669V25.3334M7.29166 16H27.7083"
          stroke="#1E1E1E"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
    <div className="flex flex-shrink-0 justify-center items-center pt-px pb-0 px-16 w-[844px] h-10">
      <div className="flex flex-shrink-0 justify-center items-center pt-[0.5625rem] pb-2 px-0 w-[716px] h-[2.4375rem] rounded-[0.625rem] bg-[#1f3557] text-black font-['Outfit'] leading-[140%]">
        Default
      </div>
    </div>
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
        fill="#1D1B20"
      />
    </svg>
    <div className="text-black font-['Roboto'] text-xs font-medium leading-[44px]">
      All values
    </div>
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 17C13.3833 17 14.5625 16.5125 15.5375 15.5375C16.5125 14.5625 17 13.3833 17 12C17 10.6167 16.5125 9.4375 15.5375 8.4625C14.5625 7.4875 13.3833 7 12 7C10.6167 7 9.4375 7.4875 8.4625 8.4625C7.4875 9.4375 7 10.6167 7 12C7 13.3833 7.4875 14.5625 8.4625 15.5375C9.4375 16.5125 10.6167 17 12 17ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
        fill="#1D1B20"
      />
    </svg>
    <div className="text-black font-['Outfit'] text-xs font-medium leading-[44px]">
      Book values
    </div>
    <div className="instructions_section flex flex-col flex-shrink-0 items-start pt-[0.8125rem] pb-[0.8125rem] px-2 w-[412px] h-[10.375rem] rounded-[0.3125rem] border-2 border-gray-300">
      <div className="flex flex-shrink-0 items-center self-stretch pr-[1.9375rem] py-0 pl-2 h-9 rounded-[0.3125rem] border border-gray-300 w-[22.1875rem] text-[#5d5e60] font-['Outfit'] text-xs font-medium leading-[44px]">
        Add ingredients in shaker with ice ....
      </div>
      <div className="flex flex-shrink-0 items-center self-stretch pr-[1.9375rem] py-0 pl-2 h-9 rounded-[0.3125rem] border border-gray-300 w-[22.1875rem] text-[#5d5e60] font-['Outfit'] text-xs font-medium leading-[44px]">
        Shake ingredients....
      </div>
      <div className="flex flex-shrink-0 items-center self-stretch pl-[0.5625rem] pr-[1.9375rem] p-2 h-9 rounded-[0.3125rem] border border-gray-300 w-[22.25rem] h-11 text-[#5d5e60] font-['Outfit'] text-xs font-medium leading-[44px]">
        Double Strain ingredients....
      </div>
    </div>
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
        fill="#1D1B20"
      />
    </svg>
    <div className="text-black font-['Outfit'] text-xs font-medium leading-[44px]">
      All values
    </div>
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 17C13.3833 17 14.5625 16.5125 15.5375 15.5375C16.5125 14.5625 17 13.3833 17 12C17 10.6167 16.5125 9.4375 15.5375 8.4625C14.5625 7.4875 13.3833 7 12 7C10.6167 7 9.4375 7.4875 8.4625 8.4625C7.4875 9.4375 7 10.6167 7 12C7 13.3833 7.4875 14.5625 8.4625 15.5375C9.4375 16.5125 10.6167 17 12 17ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
        fill="#1D1B20"
      />
    </svg>
    <div className="text-black font-['Outfit'] text-xs font-medium leading-[44px]">
      Book values
    </div>
  </div>
);

export default AddRecipeEmpty;

// import React from "react";

// const Ingredient1 = () => (
//   <div className="flex flex-shrink-0 items-center self-stretch pr-[1.625rem] py-0 pl-2 h-9 rounded-[0.3125rem] border border-gray-300 w-[22.1875rem] text-[#5d5e60] font-['Outfit'] text-xs font-medium leading-[44px]">
//     Add ingredients in shaker with ice ....
//   </div>
// );

// export default Ingredient1;

