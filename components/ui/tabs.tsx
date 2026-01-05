import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

export function Tabs({ value, onValueChange, children }: TabsProps) {
  // Catatan: komponen ini cuma "wrapper".
  // State berubah via TabsTrigger yang memanggil context onValueChange.
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div data-value={value}>{children}</div>
    </TabsContext.Provider>
  );
}

type TabsContextValue = {
  value: string;
  onValueChange: (value: string) => void;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabs() {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("Tabs components must be used within <Tabs />");
  return ctx;
}

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TabsList({ className, ...props }: TabsListProps) {
  return (
    <div
      className={cn("inline-flex gap-2 rounded-lg bg-muted p-1", className)}
      {...props}
    />
  );
}

interface TabsTriggerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onSelect"> {
  value: string;
  active?: boolean;
  onValueSelect?: (value: string) => void; // renamed to avoid conflict
}

export function TabsTrigger({
  className,
  value,
  active,
  onValueSelect,
  onClick,
  ...props
}: TabsTriggerProps) {
  const tabs = useTabs();

  return (
    <button
      type="button"
      className={cn(
        "rounded-md px-3 py-1.5 text-sm font-medium transition",
        active
          ? "bg-card text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
      onClick={(e) => {
        onClick?.(e); // keep native onClick if provided
        tabs.onValueChange(value); // update Tabs value
        onValueSelect?.(value); // optional callback with string value
      }}
      {...props}
    />
  );
}
