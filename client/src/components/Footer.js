import React from 'react'

const Footer = () => {
  return (
    <div className="bg-[color:var(--blue)]  bottom-0">
        <div className="w-[70%] mx-auto py-12">
        <section className="flex flex-wrap mobile:justify-start justify-evenly gap-8 text-white">
            <div className="flex flex-col">
                <h1 className="text-[color:#DEDEDE] font-bold">Product</h1>
                <p>Features</p>
            </div>
            <div className="flex flex-col">
                <h1 className="text-[color:#DEDEDE] font-bold">Company</h1>
                <p>About Us</p>
            </div>
            <div className="flex flex-col">
                <h1 className="text-[color:#DEDEDE] font-bold">Resources</h1>
                <p>Blog</p>
            </div>
            <div className="flex flex-col">
                <h1 className="text-[color:#DEDEDE] font-bold">Social</h1>
                <p>LinkedIn</p>
            </div>
            <div className="flex flex-col">
                <h1 className="text-[color:#DEDEDE] font-bold">Legal</h1>
                <p>Terms</p>
            </div>
        </section>
        </div>
        <div className="w-[70%] mx-auto relative">
            <hr className=""/>
            <p className="text-white text-right py-4">&#169; Serenity Spirit. All rights reserved</p>
        </div>

    </div>
  )
}

export default Footer