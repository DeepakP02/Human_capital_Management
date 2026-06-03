// @refresh reset
import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchBenefitPlans, updateBenefitPlan } from './api';

const BenefitsContext = createContext();

export const BenefitsProvider = ({ children }) => {
  const [benefitPlans, setBenefitPlans] = useState([]);

  useEffect(() => {
    fetchBenefitPlans()
      .then((plans) => {
        if (plans.length === 0) {
          const mock = [
            { id: 'BP-001', name: 'Health Insurance', enrolledCount: 45, monthlyCost: 200 },
            { id: 'BP-002', name: 'Retirement Plan', enrolledCount: 30, monthlyCost: 150 },
          ];
          setBenefitPlans(mock);
        } else {
          setBenefitPlans(plans);
        }
      })
      .catch(() => setBenefitPlans([]));
  }, []);

  const saveBenefitPlan = async (planId, updates) => {
    const updated = await updateBenefitPlan(planId, updates);
    setBenefitPlans((prev) => prev.map((p) => (p.id === planId ? updated : p)));
    return updated;
  };

  return (
    <BenefitsContext.Provider value={{ benefitPlans, setBenefitPlans, saveBenefitPlan }}>
      {children}
    </BenefitsContext.Provider>
  );
};

export const useBenefits = () => useContext(BenefitsContext);
