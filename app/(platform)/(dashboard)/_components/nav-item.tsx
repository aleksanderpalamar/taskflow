"use client"

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import Image from "next/image"

import {
  Activity,
  CreditCard,
  Layout,
  Settings,
} from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export type Organization = {
  id: string
  name: string
  slug: string
  imageUrl: string
}

interface NavItemProps {
  isActive: boolean
  isExpanded: boolean
  organization: Organization
  onExpand: (id: string) => void
}

export const NavItem = ({
  isActive,
  isExpanded,
  organization,
  onExpand
}: NavItemProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const routes = [
    {
      label: "Boards",
      icon: <Layout className="w-4 h-4 mr-2" />,
      href: `/organization/${organization.id}`,
    },
    {
      label: "Activity",
      icon: <Activity className="w-4 h-4 mr-2" />,
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: "Settings",
      icon: <Settings className="w-4 h-4 mr-2" />,
      href: `/organization/${organization.id}/settings`,
    },
    {
      label: "Billing",
      icon: <CreditCard className="w-4 h-4 mr-2" />,
      href: `/organization/${organization.id}/billing`,
    },
  ]

  const handleOnClick = (href: string) => {
    router.push(href)    
  }

  return (
    <AccordionItem
      value={organization.id}
      className="border-none"
    >
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          "flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-violet-500/10 transition text-start no-underline hover:no-underline",
          isActive && !isExpanded && "bg-violet-500/10 text-violet-500"
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="w-7 h-7 relative">
            <Image
              fill 
              src={organization.imageUrl}
              alt={organization.name}
              className="rounded-sm object-cover"
            />              
          </div>
          <span className="text-sm font-medium">{organization.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pt-1 text-violet-500">
        {routes.map((route) => (
          <Button
            key={route.href}
            variant="ghost"
            size="sm"
            className={cn(
              "w-full font-normal justify-start pl-10 mb-1 hover:bg-violet-500/10 hover:text-violet-600 transition",
              pathname === route.href && "bg-violet-500/10 text-violet-600"
            )}
            onClick={() => handleOnClick(route.href)}
          >
            <div className="flex items-center gap-x-2">
              {route.icon}
              <span>{route.label}</span>
            </div>
          </Button>
        ))}        
      </AccordionContent>
    </AccordionItem>
  )
}