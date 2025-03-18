"use client"

import { FcGoogle } from "react-icons/fc"
import { Button } from "../ui/button"
import { FaGithub } from "react-icons/fa"

export const Social = () => {
  return (
    <div className="flex items-center w-full gap-x-2" >
        <Button 
            size="lg"
            className="w-1/2"
            variant="outline"
            onClick={() => {}}
         >
            <FcGoogle className="w-5 h-5" />
        </Button>
        <Button
            className="w-1/2"
            size="lg"
            variant="outline"
            onClick={() => {}}
         >
            <FaGithub className="w-5 h-5" />
        </Button>
    </div>
  )
}
