import * as React from "react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type PhoneInputProps = Omit<
  React.ComponentProps<"input">,
  "onChange" | "value" | "ref"
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void;
  };

const PhoneInput = React.forwardRef<
  React.ElementRef<typeof RPNInput.default>,
  PhoneInputProps
>(({ className, onChange, value, ...props }, ref) => {
  return (
    <RPNInput.default
      ref={ref}
      className={cn("flex items-center", className)}
      flagComponent={FlagComponent}
      countrySelectComponent={CountrySelect}
      inputComponent={InputComponent}
      defaultCountry="IN"
      international
      value={value || undefined}
      onChange={(val) => onChange?.(val ?? "")} // 🔥 FIX
      {...props}
    />
  );
});
PhoneInput.displayName = "PhoneInput";
const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type="tel"
      className={cn(
        "w-full h-[42px] rounded-e-lg rounded-s-none bg-white/5 border border-white/10 border-l-0 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500",
        className,
      )}
      {...props}
    />
  );
});
InputComponent.displayName = "InputComponent";

type CountryEntry = {
  label: string;
  value: RPNInput.Country | undefined;
};

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
};

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
}: CountrySelectProps) => {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover
      open={isOpen}
      modal
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open) setSearchValue("");
      }}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          disabled={disabled}
          className="flex w-18 items-center justify-center gap-2 h-[42px] px-3 rounded-s-lg rounded-e-none bg-white/5 border border-white/10 border-r-0 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <FlagComponent
            country={selectedCountry}
            countryName={selectedCountry}
          />
          <ChevronsUpDown className="size-4 opacity-70" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[300px] p-0 bg-[#0f172a] border border-white/10 text-white">
        <Command>
          <CommandInput
            placeholder="Search country..."
            value={searchValue}
            onValueChange={(value) => {
              setSearchValue(value);
              setTimeout(() => {
                const viewport = scrollAreaRef.current?.querySelector(
                  "[data-radix-scroll-area-viewport]",
                );
                if (viewport) viewport.scrollTop = 0;
              }, 0);
            }}
          />

          <CommandList>
            <ScrollArea ref={scrollAreaRef} className="h-72">
              <CommandEmpty>No country found.</CommandEmpty>

              <CommandGroup>
                {countryList.map(({ value, label }) =>
                  value ? (
                    <CountrySelectOption
                      key={value}
                      country={value}
                      countryName={label}
                      selectedCountry={selectedCountry}
                      onChange={onChange}
                      onSelectComplete={() => setIsOpen(false)}
                    />
                  ) : null,
                )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

/* ---------------- COUNTRY OPTION ---------------- */

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
  onSelectComplete: () => void;
}

const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
  onSelectComplete,
}: CountrySelectOptionProps) => {
  return (
    <CommandItem
      onSelect={() => {
        onChange(country);
        onSelectComplete();
      }}
      className="flex items-center gap-2"
    >
      <FlagComponent country={country} countryName={countryName} />

      <span className="flex-1 text-sm">{countryName}</span>

      <span className="text-sm text-white/50">
        +{RPNInput.getCountryCallingCode(country)}
      </span>

      <CheckIcon
        className={cn(
          "ml-auto size-4",
          country === selectedCountry ? "opacity-100" : "opacity-0",
        )}
      />
    </CommandItem>
  );
};

/* ---------------- FLAG ---------------- */

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="flex items-center justify-center h-4 w-6 overflow-hidden rounded-sm bg-white/10">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { PhoneInput };
