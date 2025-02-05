// components/ui/multi-select.tsx

"use client"

import Select from "react-select"

interface Option {
  value: string
  label: string
}

interface MultiSelectProps {
  options: Option[]
  value: string[]
  onChange: (values: string[]) => void
  className?: string
  placeholder?: string
}

export function MultiSelect({
  options,
  value,
  onChange,
  className,
  placeholder,
}: MultiSelectProps) {
  const handleChange = (selectedOptions: Option[] | null) => {
    onChange(selectedOptions ? selectedOptions.map((option) => option.value) : [])
  }

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: "rgba(55, 65, 81, 0.5)", // bg-gray-700 bg-opacity-50
      borderColor: "#4B5563", // border-gray-600
      borderRadius: "9999px", // rounded-full
      color: "#FFFFFF", // text-white
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "rgba(31, 41, 55, 0.9)", // bg-gray-800 bg-opacity-90
    }),
    multiValue: (provided: any) => ({
      ...provided,
      backgroundColor: "#374151", // bg-gray-700
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: "#FFFFFF", // text-white
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#9CA3AF", // text-gray-400
    }),
    input: (provided: any) => ({
      ...provided,
      color: "#FFFFFF", // text-white
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#FFFFFF", // text-white
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#2563EB" : "rgba(31, 41, 55, 0.9)",
      color: "#FFFFFF",
    }),
  }

  return (
    <Select
      isMulti
      options={options}
      value={options.filter((option) => value.includes(option.value))}
      onChange={handleChange}
      className={className}
      styles={customStyles}
      placeholder={placeholder}
    />
  )
}
