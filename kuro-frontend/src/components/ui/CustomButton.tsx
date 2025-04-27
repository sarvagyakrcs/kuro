
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CustomButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  isLoading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  className,
  isLoading,
  loadingText,
  icon,
  iconPosition = 'left',
  ...props
}) => {
  return (
    <Button
      className={cn(
        "relative flex items-center gap-2 transition-all",
        isLoading && "cursor-not-allowed opacity-80",
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span className="opacity-0">{children}</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          {children}
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </Button>
  );
};

export default CustomButton;
