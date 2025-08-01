import React from 'react'

export default function NoInternet() {
  return (
    <div className="container relative pt-[80px] pb-[30px]">
        <section>
            <div className="flex flex-col justify-center items-center">
                <div>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" className="text-9xl text-primary" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path fill="none" d="M0 0h24v24H0V0z" />
                    <path d="m21 11 2-2c-3.73-3.73-8.87-5.15-13.7-4.31l2.58 2.58c3.3-.02 6.61 1.22 9.12 3.73zm-2 2a9.895 9.895 0 0 0-3.72-2.33l3.02 3.02.7-.69zM9 17l3 3 3-3a4.237 4.237 0 0 0-6 0zM3.41 1.64 2 3.05 5.05 6.1C3.59 6.83 2.22 7.79 1 9l2 2c1.23-1.23 2.65-2.16 4.17-2.78l2.24 2.24A9.823 9.823 0 0 0 5 13l2 2a6.999 6.999 0 0 1 4.89-2.06l7.08 7.08 1.41-1.41L3.41 1.64z" />
                    </svg>
                </div>
                <footer className="text-center mt-4 text-darkPrimary">
                    <h2 className="font-bold text-xl">Whoopps!</h2>
                    <p className="mt-4">No internet connection found. <br /> Please check your connection or try again</p>
                    <h3 className="mt-6">
                    <button onClick={() => window.location.reload()} className="border px-8 font-bold  border-primary py-1 text-primary rounded-3xl ">Refresh</button>
                    </h3>
                </footer>
            </div>
        </section>
    </div>

  )
}
