import React from 'react';

export default function RewardsPanel({ t, rewardRules, toggleReward }) {
  return (
    <article className="panel admin-panel active-panel">
      <div className="panel-title">{t('adminRewardsRules')}</div>
      <div className="reward-list">
        {rewardRules.map((rule) => (
          <div key={rule.id} className="reward-row">
            <div>
              <strong>{rule.rule}</strong>
              <p>{rule.points} {t('adminPoints')}</p>
            </div>
            <button
              type="button"
              className={`mini-toggle ${rule.enabled ? 'on' : ''}`}
              onClick={() => toggleReward(rule.id)}
            >
              {rule.enabled ? t('adminEnabled') : t('adminDisabled')}
            </button>
          </div>
        ))}
      </div>
    </article>
  );
}
