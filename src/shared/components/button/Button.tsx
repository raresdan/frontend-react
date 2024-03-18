import {ButtonProps} from '../../../types/ButtonProps.types';

export function Button(props: ButtonProps) {
    return (
        <button
            type={props.type}
            className={'button ' + (props.className ? props.className : '')}
            onClick={props.onClick}
        >
            {props.buttonText}
        </button>
    );
}
