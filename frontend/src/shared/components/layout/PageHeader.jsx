import React from 'react';

/**
 * Reusable page header component for SuperAdmin section pages.
 *
 * @param {Object} props
 * @param {React.Component} [props.icon] - Icon component from lucide-react.
 * @param {string} props.title - Main heading text.
 * @param {string} [props.subtitle] - Optional descriptive paragraph.
 */
export const PageHeader = ({ icon: Icon, title, subtitle, children }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
      <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
        {Icon && <Icon className="text-primary-600" size={32} />}
        {title}
      </h1>
      {subtitle && (
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
          {subtitle}
        </p>
      )}
    </div>
    {children && (
      <div className="flex items-center gap-3 self-start md:self-auto">
        {children}
      </div>
    )}
  </div>
);

export default PageHeader;
