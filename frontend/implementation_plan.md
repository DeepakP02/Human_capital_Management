c;# Simplify Global Analytics Suite Page

## Goal Description
Replace the current highly interactive "Global Analytics Suite" page in `src/features/superadmin/GlobalAnalytics.jsx` with a simplified, clean view that presents only essential metrics without complex animations, live simulations, or extensive UI elements. The page should still retain a modern look but be straightforward for users who prefer minimalism.

## User Review Required
- **Which key metrics should remain?** (e.g., API Request Rate, Active Cloud Sockets, Median Latency, Database Clusters)
- **Do you want to keep the export button?**
- **Should the time‑range selector (7d / 30d / 12m) stay?**
- **Any specific styling preferences for the simplified view?** (e.g., dark mode only, specific color palette)

## Open Questions
> [!IMPORTANT]
> - Confirm the list of metrics to display.
> - Do you want to retain any live simulation (system load chart) or remove it entirely?
> - Should the page still include a header subtitle?

## Proposed Changes
---
### Component: `GlobalAnalytics.jsx`
- **Trim imports**: Remove unused icons and animation libraries (`framer-motion`, many Lucide icons, etc.).
- **Simplify state**: Keep only the metrics data array; remove simulation state (`systemLoad`, `activeSockets`, `latency`, `isSimulating`).
- **Static header**: Keep `PageHeader` with title and optional subtitle.
- **Metrics cards**: Render a reduced set of `StatCard` components (e.g., keep the four core stats). Adjust `analyticsStats` accordingly.
- **Remove live chart**: Delete the entire section that draws the animated SVG sparkline and related controls.
- **Remove hub list and extra sections**: Keep only the KPI widgets.
- **Export button**: Retain simple click handler that shows a toast.
- **Styling**: Use basic Tailwind utility classes for layout (grid) and spacing; no complex motion variants.
---
### Files Modified
- [MODIFY] [GlobalAnalytics.jsx](file:///c:/Users/abc/Human_capital_Management/frontend/src/features/superadmin/GlobalAnalytics.jsx)

## Verification Plan
### Automated Tests
- Run `npm run dev` and manually inspect `http://localhost:5173/superadmin/analytics` to ensure the page loads without errors and displays only the selected metrics.
- Verify that the export button still triggers the toast.

### Manual Verification
- Open the page in a browser and confirm the UI is simplified as per the agreed metric list.
- Check responsiveness on different screen sizes.
