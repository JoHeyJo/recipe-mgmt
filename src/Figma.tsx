import React from "react";

export type DesktopViewProps = {};

export function DesktopView(props: DesktopViewProps) {
  return (
    <div
      x-name="desktopView"
      className="w-[1440px] h-[1024px] relative overflow-hidden bg-[#c5cbd2] p-0"
    >
      <div
        x-name="mainContainer"
        className="w-[1350px] h-[819px] absolute overflow-hidden -translate-x-2/4 p-0 border-[3px] border-[#000000] left-2/4 top-2/4"
      >
        <svg
          className="leftPageLines"
          width={38}
          height={819}
          viewBox="0 0 38 819"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="0.514648" y1={819} x2="0.514648" y2={-4} stroke="black" />
          <line x1="5.51465" y1={819} x2="5.51465" y2={-4} stroke="black" />
          <line x1="9.51465" y1={819} x2="9.51465" y2={-4} stroke="black" />
          <line x1="14.5146" y1={819} x2="14.5146" y2={-4} stroke="black" />
          <line x1="18.5146" y1={819} x2="18.5146" y2={-4} stroke="black" />
          <line x1="23.5146" y1={819} x2="23.5146" y2={-4} stroke="black" />
          <line x1="27.5146" y1={819} x2="27.5146" y2={-4} stroke="black" />
          <line x1="32.5146" y1={819} x2="32.5146" y2={-4} stroke="black" />
          <line x1="36.5146" y1={819} x2="36.5146" y2={-4} stroke="black" />
        </svg>
        <svg
          className="rightPageLines"
          width={38}
          height={813}
          viewBox="0 0 38 813"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="0.996338"
            y1={813}
            x2="0.996338"
            y2="-0.000366211"
            stroke="black"
          />
          <line x1="5.5" y1="813.001" x2="5.5" stroke="black" />
          <line
            x1="10.0037"
            y1="813.001"
            x2="10.0037"
            y2="0.000366211"
            stroke="black"
          />
          <line
            x1="14.5073"
            y1="813.001"
            x2="14.5073"
            y2="0.000732422"
            stroke="black"
          />
          <line
            x1="19.011"
            y1="813.002"
            x2="19.011"
            y2="0.00109863"
            stroke="black"
          />
          <line
            x1="23.5146"
            y1="813.002"
            x2="23.5146"
            y2="0.00146484"
            stroke="black"
          />
          <line
            x1="28.0183"
            y1="813.002"
            x2="28.0183"
            y2="0.00183105"
            stroke="black"
          />
          <line
            x1="32.522"
            y1="813.003"
            x2="32.522"
            y2="0.00219727"
            stroke="black"
          />
          <line
            x1="37.0256"
            y1="813.003"
            x2="37.0256"
            y2="0.00256348"
            stroke="black"
          />
        </svg>
      </div>
      <div x-name="group1" className="w-[1256px] h-[819px] absolute p-0">
        <div
          x-name="leftPage"
          className="w-[628px] h-[819px] relative overflow-hidden bg-[#e5e7eb] p-0 border-[3px] border-[#1f2937]"
        >
          <div
            x-name="recipeTitle"
            className="w-[623px] h-[60px] absolute overflow-hidden bg-[#e5e7eb] p-0 border-b-2 border-b-[#1f2937] left-0.5 top-0"
          >
            <span
              x-name="recipeBookSection"
              className="font-[Roboto,ui-sans-serif] absolute text-[32px] font-medium text-[#000000] leading-[44px] left-2.5 top-4"
            >
              Recipes for:
            </span>
          </div>
          <div
            x-name="recipes"
            className="w-[624px] h-[41px] absolute overflow-hidden -translate-x-2/4 p-0 border-b-[#1f2937] border-b left-2/4 bottom-[719px]"
          >
            <span
              x-name="margarita"
              className="absolute -translate-y-2/4 text-base text-[#1a202c] leading-[1.4rem] left-[23px] top-2/4 !hidden"
            >
              Margarita
            </span>
          </div>
          <div
            x-name="recipes"
            className="w-[624px] h-[41px] absolute overflow-hidden -translate-x-2/4 p-0 border-b-[#1f2937] border-b left-2/4 bottom-[678px]"
          >
            <span
              x-name="margarita"
              className="absolute -translate-y-2/4 text-base text-[#1a202c] leading-[1.4rem] left-[23px] top-2/4 !hidden"
            >
              Margarita
            </span>
          </div>
          <div
            x-name="recipes"
            className="w-[624px] h-[41px] absolute overflow-hidden -translate-x-2/4 p-0 border-b-[#1f2937] border-b left-2/4 bottom-[596px]"
          >
            <span
              x-name="margarita"
              className="absolute -translate-y-2/4 text-base text-[#1a202c] leading-[1.4rem] left-[23px] top-2/4 !hidden"
            >
              Margarita
            </span>
          </div>
          <div
            x-name="recipes"
            className="w-[624px] h-[41px] absolute overflow-hidden -translate-x-2/4 p-0 border-b-[#1f2937] border-b left-2/4 bottom-[555px]"
          >
            <span
              x-name="margarita"
              className="absolute -translate-y-2/4 text-base text-[#1a202c] leading-[1.4rem] left-[23px] top-2/4 !hidden"
            >
              Margarita
            </span>
          </div>
          <div
            x-name="recipes"
            className="w-[624px] h-[41px] absolute overflow-hidden -translate-x-2/4 p-0 border-b-[#1f2937] border-b left-2/4 bottom-[514px]"
          >
            <span
              x-name="margarita"
              className="absolute -translate-y-2/4 text-base text-[#1a202c] leading-[1.4rem] left-[23px] top-2/4 !hidden"
            >
              Margarita
            </span>
          </div>
          <div
            x-name="recipes"
            className="w-[624px] h-[41px] absolute overflow-hidden -translate-x-2/4 p-0 border-b-[#1f2937] border-b left-2/4 bottom-[473px]"
          >
            <span
              x-name="margarita"
              className="absolute -translate-y-2/4 text-base text-[#1a202c] leading-[1.4rem] left-[23px] top-2/4 !hidden"
            >
              Margarita
            </span>
          </div>
          <div
            x-name="recipes"
            className="w-[624px] h-[41px] absolute overflow-hidden -translate-x-2/4 p-0 border-b-[#1f2937] border-b left-2/4 bottom-[432px]"
          >
            <span
              x-name="margarita"
              className="absolute -translate-y-2/4 text-base text-[#1a202c] leading-[1.4rem] left-[23px] top-2/4 !hidden"
            >
              Margarita
            </span>
          </div>
          <div
            x-name="recipes"
            className="w-[624px] h-[41px] absolute overflow-hidden -translate-x-2/4 p-0 border-b-[#1f2937] border-b left-2/4 bottom-[391px]"
          >
            <span
              x-name="margarita"
              className="absolute -translate-y-2/4 text-base text-[#1a202c] leading-[1.4rem] left-[23px] top-2/4 !hidden"
            >
              Margarita
            </span>
          </div>
          <div
            x-name="recipes"
            className="w-[624px] h-[41px] absolute overflow-hidden -translate-x-2/4 p-0 border-b-[#1f2937] border-b left-2/4 bottom-[350px]"
          >
            <span
              x-name="margarita"
              className="absolute -translate-y-2/4 text-base text-[#1a202c] leading-[1.4rem] left-[23px] top-2/4 !hidden"
            >
              Margarita
            </span>
          </div>
          <div
            x-name="recipes"
            className="w-[624px] h-[41px] absolute overflow-hidden -translate-x-2/4 p-0 border-b-[#1f2937] border-b left-2/4 bottom-[307px]"
          >
            <span
              x-name="margarita"
              className="absolute -translate-y-2/4 text-base text-[#1a202c] leading-[1.4rem] left-[23px] top-2/4 !hidden"
            >
              Margarita
            </span>
          </div>
          <div
            x-name="recipes"
            className="w-[624px] h-[41px] absolute overflow-hidden -translate-x-2/4 p-0 border-b-[#1f2937] border-b left-2/4 bottom-[267px]"
          >
            <span
              x-name="margarita"
              className="absolute -translate-y-2/4 text-base text-[#1a202c] leading-[1.4rem] left-[23px] top-2/4 !hidden"
            >
              Margarita
            </span>
          </div>
          <div
            x-name="recipes"
            className="w-[624px] h-[41px] absolute overflow-hidden -translate-x-2/4 p-0 border-b-[#1f2937] border-b left-2/4 bottom-[226px]"
          >
            <span
              x-name="margarita"
              className="absolute -translate-y-2/4 text-base text-[#1a202c] leading-[1.4rem] left-[23px] top-2/4 !hidden"
            >
              Margarita
            </span>
          </div>
          <div
            x-name="recipes"
            className="w-[624px] h-[41px] absolute overflow-hidden -translate-x-2/4 p-0 border-b-[#1f2937] border-b left-2/4 bottom-[183px]"
          >
            <span
              x-name="margarita"
              className="absolute -translate-y-2/4 text-base text-[#1a202c] leading-[1.4rem] left-[23px] top-2/4 !hidden"
            >
              Margarita
            </span>
          </div>
          <div
            x-name="recipes"
            className="w-[624px] h-[41px] absolute overflow-hidden -translate-x-2/4 p-0 border-b-[#1f2937] border-b left-2/4 bottom-[142px]"
          >
            <span
              x-name="margarita"
              className="absolute -translate-y-2/4 text-base text-[#1a202c] leading-[1.4rem] left-[23px] top-2/4 !hidden"
            >
              Margarita
            </span>
          </div>
          <div
            x-name="recipes"
            className="w-[624px] h-[41px] absolute overflow-hidden -translate-x-2/4 p-0 border-b-[#1f2937] border-b left-2/4 bottom-[101px]"
          >
            <span
              x-name="margarita"
              className="absolute -translate-y-2/4 text-base text-[#1a202c] leading-[1.4rem] left-[23px] top-2/4 !hidden"
            >
              Margarita
            </span>
          </div>
          <div
            x-name="recipes"
            className="w-[624px] h-[41px] absolute overflow-hidden -translate-x-2/4 p-0 border-b-[#1f2937] border-b left-2/4 bottom-[58px]"
          >
            <span
              x-name="margarita"
              className="absolute -translate-y-2/4 text-base text-[#1a202c] leading-[1.4rem] left-[23px] top-2/4 !hidden"
            >
              Margarita
            </span>
          </div>
          <div
            x-name="recipes"
            className="w-[624px] h-[41px] absolute overflow-hidden -translate-x-2/4 p-0 border-b-[#1f2937] border-b left-2/4 bottom-[637px]"
          >
            <span
              x-name="margarita"
              className="absolute -translate-y-2/4 text-base text-[#1a202c] leading-[1.4rem] left-[23px] top-2/4 !hidden"
            >
              Margarita
            </span>
          </div>
          <svg
            width={626}
            height={26}
            viewBox="0 0 626 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M627.5 25.3859C362.3 -12.2141 99.3333 9.71926 1 25.3859M627.5 25.3859C362.3 -12.2141 84 -1.61407 1 25.3859M627.5 25.3859C361 -7.61407 97.5 16.8859 1 25.3859M627.5 25.3859C360 5.01723 97.5 20.3859 1 25.3859"
              stroke="black"
            />
          </svg>
        </div>
        <div
          x-name="rightPage"
          className="w-[628px] h-[819px] relative overflow-hidden bg-[#e5e7eb] p-0 border-[3px] border-[#000000]"
        >
          <div
            x-name="recipeTitle"
            className="w-[623px] h-[60px] absolute overflow-hidden bg-[#e5e7eb] p-0 left-[5px] top-[5px]"
          >
            <span
              x-name="recipe"
              className="font-[Roboto,ui-sans-serif] absolute text-[32px] font-medium text-[#000000] leading-[44px] left-0 top-3"
            >
              Recipe:<span className="text-xs">:</span>
            </span>
          </div>
          <div
            x-name="recipeTitleSection"
            className="w-[623px] h-[60px] absolute p-0"
          >
            <div
              x-name="recipeTitle"
              className="w-[623px] h-[60px] relative overflow-hidden bg-[#e5e7eb] p-0"
            >
              <span
                x-name="recipe"
                className="font-[Roboto,ui-sans-serif] absolute text-[32px] font-medium text-[#000000] leading-[44px] left-0 top-3"
              >
                Recipe:
              </span>
            </div>
          </div>
          <div
            x-name="ingredientSection"
            className="w-[626px] h-[73px] absolute overflow-hidden bg-[#ffffff] p-0 left-0.5 top-[65px]"
          >
            <span
              x-name="ingredients"
              className="font-[Roboto,ui-sans-serif] absolute text-xl text-[#000000] leading-[44px] left-[18px] top-[7px]"
            >
              Ingredients:
            </span>
          </div>
          <div
            x-name="instructionSection"
            className="w-[626px] h-[73px] absolute overflow-hidden bg-[#e5e7eb] p-0 left-0 top-[138px]"
          >
            <span
              x-name="instructions"
              className="font-[Roboto,ui-sans-serif] absolute text-xl text-[#000000] leading-[44px] left-5 top-3.5"
            >
              Instructions:{" "}
            </span>
          </div>
          <div
            x-name="notesSection"
            className="w-[626px] h-44 absolute overflow-hidden bg-[#ffffff] p-0 left-0.5 top-[211px]"
          >
            <span
              x-name="notes"
              className="font-[Roboto,ui-sans-serif] absolute -translate-y-2/4 text-xl text-[#000000] leading-[44px] left-[18px] top-2/4"
            >
              Notes:
            </span>
          </div>
          <svg
            width={626}
            height={26}
            viewBox="0 0 626 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.5 25C265.7 -12.6 528.667 9.33334 627 25M0.5 25C265.7 -12.6 544 -2 627 25M0.5 25C267 -8 530.5 16.5 627 25M0.5 25C268 4.6313 530.5 20 627 25"
              stroke="black"
            />
          </svg>
        </div>
      </div>
      <div
        x-name="navBar"
        className="w-[1440px] h-16 absolute overflow-hidden bg-[#1f2937] p-0 left-0 top-0"
      />
      <div x-name="maskGroup" className="w-12 h-[60px] absolute p-0">
        {/* <img
          src="/images/eli1.png"
          onerror="this.src='http://svgur.com/i/x4x.svg'"
          x-name="eli1"
          className="w-[57.07px] h-[88.65px] relative object-cover p-0"
        /> */}
      </div>
    </div>
  );
}
