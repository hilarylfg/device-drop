import { Minus, Plus } from 'lucide-react';
import { CountButtonProps } from './count-button';
import { cn } from '@/shared/lib/utils';
import {Button} from "@/shared/components";

interface countButtonIconsProps {
    size?: CountButtonProps['size'];
    disabled?: boolean;
    type?: 'plus' | 'minus';
    onClick?: () => void;
}

export const CountButtonIcons: React.FC<countButtonIconsProps> = ({
                                                               size = 'sm',
                                                               disabled,
                                                               type,
                                                               onClick,
                                                           }) => {
    return (
        <Button
            disabled={disabled}
            onClick={onClick}
            type="button"
            className={cn(size === 'sm' ? 'count-button-small' : 'count-button-large',
            )}>
            {type === 'plus' ? (
                <Plus size={type === "plus" ? 16 : 20}/>
            ) : (
                <Minus size={type === "minus" ? 16 : 20}/>
            )}
        </Button>
    );
};