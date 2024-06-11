




const HeroSection=()=>{


return (

<div className="mx-auto h-2/6 flex-col container flex max-w-7xl">
            <div className="bg-white">
              <div className="w-full border-b-2 border-gray-200">
                <div className="bg-white">
                  <div className="w-full border-b-2 border-gray-200"></div>
                </div>
              </div>
            </div>
            <div className="mx-auto mt-6 w-full px-6 lg:mx-0 lg:max-w-none max-w-3xl">
              <div className="mb-6 mt-4 items-end justify-between text-white flex">
                <div>
                  <p className="text-xl font-medium lg:text-2xl">Dark dashboard with 3-column sections</p>
                  <p className="text-gray-400">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                </div>
                <button  type="button" className="inline-flex border border-gray-500 transition-all
                    hover:bg-white hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500
                    focus:ring-offset-2 justify-center rounded-md bg-gray-600 px-3 py-1 text-sm font-medium text-white
                    shadow-sm">Add Text</button>
              </div>
            </div>
            <div>
              <div className="sm:hidden">
                <label className="sr-only">Select a tab</label>
                <select  type="select-one" className="block border-gray-300 focus:border-indigo-500
                    focus:outline-none focus:ring-indigo-500 w-full rounded-md py-2 pl-3 pr-10 text-base sm:text-sm">
                  <option >Tab One</option>
                  <option >Tab Two</option>
                  <option >Tab Three</option>
                  <option >Tab Four</option>
                </select>
              </div>
              <div className="sm:block hidden"></div>
            </div>
            <div className="w-full bg-gray-800 py-20 2xl:py-40 relative">
              <div className="pt-0 pr-2 pb-0 pl-2 mt-0 mr-auto mb-0 ml-auto">
                <div className="pt-4 pr-4 pb-4 pl-4 mt-0 mr-auto mb-0 ml-auto shadow-lg rounded-xl bg-gray-900 w-screen
                    h-screen border max-w-5xl overflow-x-auto overflow-y-hidden">
                  <p className="text-3xl font-bold mt-4 mr-0 mb-2 ml-0 text-left">History</p>
                  <p className="text-base font-normal mt-0 mr-0 mb-4 ml-0 text-left">Lorem ipsum dolor sit amet consecteur
                      adipiscing elit</p>
                  <table className="w-full table-auto">
                    <tbody>
                      <tr className="text-base bg-gray-200">
                        <td className="pt-5 pr-0 pb-5 pl-10 text-base">Number</td>
                        <td className="text-base">John Doe</td>
                        <td className="text-base">89+</td>
                        <td className="text-base">-</td>
                        <td className="text-base">100</td>
                        <td className="text-base">
                          <svg width="20" height="16" viewBox="0 0 20 16" fill="#000" xmlns="http://www.w3.org/2000/svg"
                              className="" id="Windframe_6oGzk-A-V"><path d="M6.81671 15.0418L0 8.2251L0.90027
                              7.32483L6.81671 13.2413L19.0997 0.958252L20 1.85852L6.81671 15.0418Z" fill="#000"/></svg>
                        </td>
                      </tr>
                      <tr>
                        <td className="pt-5 pr-0 pb-5 pl-10 text-base">Employment</td>
                        <td className="text-base">Anthony Moss</td>
                        <td className="text-base">-</td>
                        <td className="text-base">476</td>
                        <td className="text-base">65+</td>
                        <td className="text-base">
                          <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg"
                              className="" id="Windframe_c-hxe0p2K"><path d="M6.81671 15.0418L0 8.2251L0.90027
                              7.32483L6.81671 13.2413L19.0997 0.958252L20 1.85852L6.81671 15.0418Z" fill="#000"/></svg>
                        </td>
                      </tr>
                      <tr className="bg-gray-200">
                        <td className="pt-5 pr-0 pb-5 pl-10 text-base">Score</td>
                        <td className="text-base">Jane Ruth</td>
                        <td className="text-base">783</td>
                        <td className="text-base">909</td>
                        <td className="text-base">-</td>
                        <td className="text-base">
                          <svg width="16" height="2"  fill="none" xmlns="http://www.w3.org/2000/svg"
                              className="" id="Windframe_t0ZXgbczO"><line y1="1.35" x2="16" y2="1.35" stroke="#000"
                              stroke-width="1.3"/></svg>
                        </td>
                      </tr>
                      <tr>
                        <td className="pt-5 pr-0 pb-5 pl-10 text-base">Quality</td>
                        <td className="text-base">Henry Smith</td>
                        <td className="text-base">-</td>
                        <td className="text-base">-</td>
                        <td className="text-base">903</td>
                        <td className="text-base">
                          <svg width="20" height="16"  fill="none" xmlns="http://www.w3.org/2000/svg"
                              className="" id="Windframe_K3RALo-UX"><path d="M6.81671 15.0418L0 8.2251L0.90027
                              7.32483L6.81671 13.2413L19.0997 0.958252L20 1.85852L6.81671 15.0418Z" fill="#000"/></svg>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="mt-40 mr-auto mb-40 ml-auto max-w-3xl">
              <div>
                <div className="sr-only">Notifications</div>
              </div>
              </div>
              </div>



);


}
export default HeroSection;