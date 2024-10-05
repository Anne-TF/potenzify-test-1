interface IProps {
    customColorClass?: string;
    customClasses?: string;
}

const BouncingLabel = ({ customColorClass = 'bg-app-primary', customClasses }: IProps) =>
{
    return (
        <div role="banner" aria-label="start_bouncing_label" className={`shadow-lg shadow-black/50 absolute -top-8 -left-3 rounded-lg animate-bounce ${customClasses}`}>
              <span
                  className={`${customColorClass} block relative z-10 px-2 py-3 rounded-lg text-white`}>
                    Comienza tu aventura
            </span>
            <span className={`${customColorClass} z-0 h-9 w-9 absolute -bottom-3 left-[38%] rotate-45 rounded-lg`} />
        </div>
    )
}

export default BouncingLabel;