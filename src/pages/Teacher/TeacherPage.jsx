import React from 'react';

export default function StudentPage() {
  return (
    <div
      className="screen"
      style={{
        minHeight: '70vh',
        display: 'grid',
        placeItems: 'center',
        background:
          'radial-gradient(circle at 20% 20%, rgba(14, 165, 233, 0.22), transparent 34%), radial-gradient(circle at 80% 16%, rgba(37, 99, 235, 0.22), transparent 36%), linear-gradient(160deg, #f8fbff 0%, #eef6ff 100%)',
        borderRadius: 16,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 640,
          margin: '0 auto',
          padding: '42px 28px',
          borderRadius: 16,
          border: '1px solid #bfdbfe',
          background: 'rgba(255, 255, 255, 0.86)',
          boxShadow: '0 24px 50px rgba(30, 64, 175, 0.12)',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '7px 14px',
            borderRadius: 999,
            background: '#dbeafe',
            border: '1px solid #93c5fd',
            color: '#1e40af',
            fontWeight: 700,
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: 0.6,
            animation: 'pulseBadge 1.8s ease-in-out infinite',
          }}
        >
          Teacher Module
        </span>

        <h2
          style={{
            margin: '16px 0 10px',
            color: '#0f172a',
            fontSize: 'clamp(32px, 5vw, 52px)',
            lineHeight: 1.08,
          }}
        >
          Coming Soon
        </h2>

        <p
          style={{
            margin: 0,
            color: '#334155',
            fontSize: 16,
          }}
        >
          We are crafting a better teacher experience. Stay tuned for the launch.
        </p>

        <div style={{ marginTop: 22, display: 'flex', justifyContent: 'center', gap: 8 }}>
          <span className="cs-dot" style={{ animationDelay: '0s' }} />
          <span className="cs-dot" style={{ animationDelay: '0.2s' }} />
          <span className="cs-dot" style={{ animationDelay: '0.4s' }} />
        </div>

        <div
          style={{
            position: 'absolute',
            inset: -2,
            borderRadius: 16,
            pointerEvents: 'none',
            border: '1px solid rgba(125, 211, 252, 0.45)',
            animation: 'glowFrame 2.6s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes pulseBadge {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.25); }
          50% { transform: scale(1.04); box-shadow: 0 0 0 8px rgba(37, 99, 235, 0); }
        }

        @keyframes bounceDot {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.45; }
          40% { transform: translateY(-6px); opacity: 1; }
        }

        @keyframes glowFrame {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 1; }
        }

        .cs-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #2563eb;
          display: inline-block;
          animation: bounceDot 1.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
