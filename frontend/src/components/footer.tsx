import React from 'react';
import { CircleDot } from 'lucide-react';

const Footer: React.FC = () => (
  <footer
    className="border-t py-8 px-4"
    style={{ borderColor: 'hsl(30 25% 85%)' }}
  >
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex flex-col items-center sm:items-start gap-1">
        <div
          className="flex items-center gap-2"
          style={{
            color: 'hsl(222 35% 12%)',
            fontFamily: "var(--font-gloock), 'Gloock', serif",
          }}
        >
          <CircleDot
            className="h-4 w-4"
            style={{ color: 'hsl(196 55% 38%)' }}
          />
          <span className="font-semibold text-sm">Node4analytics</span>
        </div>
        <p className="text-xs" style={{ color: 'hsl(222 12% 46%)' }}>
          Built for the analyst who expects more from their tools.
        </p>
      </div>
      <p className="text-xs" style={{ color: 'hsl(222 12% 46%)' }}>
        &copy; {new Date().getFullYear()} Node4analytics. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
