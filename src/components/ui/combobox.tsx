"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ComboboxProps {
    value: string;
    label: string;
    element?: React.ReactElement
}

export function Combobox<T extends ComboboxProps>(
    { items, placeholder = "Selecione um item", className, onSelect, defaultValue, value: comboValue }: 
    { items: T[], placeholder?: string, className?: string, onSelect: (info: string) => void, defaultValue?: string, value: string }
) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(comboValue)

  React.useEffect(() => {
    onSelect(value)
  }, [value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          className={`max-w-[200px] w-full justify-between ${ className }`}
        >
          {value
            ? items.find(item => item.value === value)?.element || items.find(item => item.value === value)?.label
            : items[0]?.element || items[0]?.label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {items.map(item => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.element || item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
