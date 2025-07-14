
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Employee {
  id: string;
  name: string;
  department: string;
  email?: string;
}

const defaultEmployees: Employee[] = [
  { id: "1", name: "John Smith", department: "Finance", email: "john.smith@company.com" },
  { id: "2", name: "Sarah Johnson", department: "Legal", email: "sarah.johnson@company.com" },
  { id: "3", name: "Mike Davis", department: "HR", email: "mike.davis@company.com" },
  { id: "4", name: "Emily Chen", department: "Marketing", email: "emily.chen@company.com" },
  { id: "5", name: "David Wilson", department: "IT", email: "david.wilson@company.com" },
  { id: "6", name: "Lisa Anderson", department: "Operations", email: "lisa.anderson@company.com" },
  { id: "7", name: "Robert Brown", department: "Finance", email: "robert.brown@company.com" },
  { id: "8", name: "Jennifer Garcia", department: "HR", email: "jennifer.garcia@company.com" },
  { id: "9", name: "Michael Taylor", department: "Legal", email: "michael.taylor@company.com" },
  { id: "10", name: "Amanda Martinez", department: "Marketing", email: "amanda.martinez@company.com" }
];

interface EmployeeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  name?: string;
  required?: boolean;
}

export const EmployeeSelector = ({ 
  value, 
  onChange, 
  placeholder = "Select or enter employee name", 
  name,
  required 
}: EmployeeSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isCustomValue, setIsCustomValue] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check if current value is a custom value (not in employee list)
  useEffect(() => {
    const isInList = defaultEmployees.some(emp => emp.name.toLowerCase() === value.toLowerCase());
    setIsCustomValue(value !== "" && !isInList);
  }, [value]);

  const handleSelect = (employeeName: string) => {
    onChange(employeeName);
    setOpen(false);
    setSearchValue("");
    setIsCustomValue(false);
  };

  const handleCustomInput = (inputValue: string) => {
    onChange(inputValue);
    setSearchValue(inputValue);
    setIsCustomValue(inputValue !== "" && !defaultEmployees.some(emp => 
      emp.name.toLowerCase() === inputValue.toLowerCase()
    ));
  };

  const filteredEmployees = defaultEmployees.filter(employee =>
    employee.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-10 px-3 py-2 text-left font-normal"
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <User className="h-4 w-4 text-slate-400 flex-shrink-0" />
              <span className={cn(
                "truncate",
                !value && "text-muted-foreground"
              )}>
                {value || placeholder}
              </span>
              {isCustomValue && (
                <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded flex-shrink-0">
                  Custom
                </span>
              )}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full min-w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <Command>
            <div className="px-3 py-2 border-b">
              <Input
                ref={inputRef}
                placeholder="Search employees or enter custom name..."
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  handleCustomInput(e.target.value);
                }}
                className="h-9 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
              />
            </div>
            <CommandList className="max-h-[200px]">
              {searchValue && !filteredEmployees.some(emp => 
                emp.name.toLowerCase() === searchValue.toLowerCase()
              ) && (
                <CommandGroup>
                  <CommandItem
                    onSelect={() => handleSelect(searchValue)}
                    className="cursor-pointer"
                  >
                    <Check className={cn(
                      "mr-2 h-4 w-4",
                      value === searchValue ? "opacity-100" : "opacity-0"
                    )} />
                    <div className="flex items-center gap-2">
                      <span>Add "{searchValue}" as custom recipient</span>
                      <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">
                        New
                      </span>
                    </div>
                  </CommandItem>
                </CommandGroup>
              )}
              
              {filteredEmployees.length > 0 && (
                <CommandGroup heading="Employees">
                  {filteredEmployees.map((employee) => (
                    <CommandItem
                      key={employee.id}
                      onSelect={() => handleSelect(employee.name)}
                      className="cursor-pointer"
                    >
                      <Check className={cn(
                        "mr-2 h-4 w-4",
                        value === employee.name ? "opacity-100" : "opacity-0"
                      )} />
                      <div className="flex flex-col">
                        <span className="font-medium">{employee.name}</span>
                        <span className="text-xs text-slate-500">{employee.department}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              
              {filteredEmployees.length === 0 && searchValue && (
                <CommandEmpty>
                  No employees found. Press Enter to add "{searchValue}" as custom recipient.
                </CommandEmpty>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      
      {/* Hidden input for form submission */}
      {name && (
        <input
          type="hidden"
          name={name}
          value={value}
          required={required}
        />
      )}
    </div>
  );
};
