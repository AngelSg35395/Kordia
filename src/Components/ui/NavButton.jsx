export default function NavButton({ label, icon = "expand-horizontal" }) {
    return (
        <button
            className="cursor-pointer flex flex-col items-center justify-center lg:flex-row lg:gap-1
              text-gray-600 hover:text-indigo-700 focus:text-indigo-800 
              dark:text-gray-400 dark:hover:text-violet-700 dark:focus:text-violet-800
              fill-gray-600 hover:fill-indigo-700 focus:fill-indigo-800 dark:fill-gray-400 dark:hover:fill-violet-700 dark:focus:fill-violet-800"
            type="button"
            aria-label={"Ir a " + label}
            title={"Ir a " + label}
        >
            <box-icon name={icon}></box-icon>
            <span>{label}</span>
        </button>
    )
}