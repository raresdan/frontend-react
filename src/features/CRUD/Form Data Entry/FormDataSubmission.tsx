import {forwardRef} from 'react';
import {FormEntryProps} from '../../../types/FormEntryProps.types';

const FormDataEntry = forwardRef<HTMLInputElement, FormEntryProps>(
    (props, ref) => {
        return (
            <div className='form-submission'>
                <label className='form-label'>{props.label}</label>
                {props.defaultValue === '' ? (
                    <input
                        type='text'
                        className='form-input'
                        id={props.label}
                        placeholder={props.placeholder}
                        disabled={props.disabled}
                        ref={ref}
                    />
                ) : (
                    <input
                        type='text'
                        className='form-input'
                        id={props.label}
                        placeholder={props.defaultValue}
                        defaultValue={props.defaultValue}
                        disabled={props.disabled}
                        ref={ref}
                    />
                )}
            </div>
        );
    },
);

export {FormDataEntry};
