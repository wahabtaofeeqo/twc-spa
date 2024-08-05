import { forwardRef, SelectHTMLAttributes, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function SelectInput(
    {className = '', isFocused = false, options = [], ...props }: SelectHTMLAttributes<HTMLSelectElement> & { isFocused?: boolean, options: any[] },
    ref) {

    const localRef = useRef<HTMLSelectElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <select
                {...props}
                className={
                    `border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ` +
                    className
                }

                ref={localRef}>
                    <option value="">Select Option</option>
                    {
                        options.map((item, index) => {
                            return  <option key={index} value={item}>{item}</option>
                        })
                    }
            </select>
        </div>
    );
});
