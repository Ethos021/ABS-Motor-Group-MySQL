import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Calculator, CreditCard, FileText, Users, CheckCircle, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import Layout from '@/components/layout'

// Define a type for our calculator state
interface CalculatorData {
  vehiclePrice: number;
  deposit: number;
  term: number;
  interestRate: number;
}

export default function Finance() {
  const [calculatorData, setCalculatorData] = useState<CalculatorData>({
    vehiclePrice: 50000,
    deposit: 10000,
    term: 60,
    interestRate: 5.99
  });

  // Calculate payments safely
  const calculatePayments = () => {
    const vehiclePrice = calculatorData.vehiclePrice ?? 0;
    const deposit = calculatorData.deposit ?? 0;
    const term = calculatorData.term ?? 1; // avoid divide by zero
    const interestRate = calculatorData.interestRate ?? 0;

    const principal = vehiclePrice - deposit;
    const monthlyRate = interestRate / 100 / 12;

    if (monthlyRate === 0) {
      return { monthly: principal / term, weekly: principal / term / 4, total: principal };
    }

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, term)) /
      (Math.pow(1 + monthlyRate, term) - 1);
    const weeklyPayment = (monthlyPayment * 12) / 52;

    return {
      monthly: isNaN(monthlyPayment) ? 0 : monthlyPayment,
      weekly: isNaN(weeklyPayment) ? 0 : weeklyPayment,
      total: isNaN(monthlyPayment * term) ? 0 : monthlyPayment * term
    };
  };

  const payments = calculatePayments();

  const benefits = [
    { icon: CreditCard, title: "Competitive Rates", description: "From 5.99% comparison rate for approved customers" },
    { icon: FileText, title: "Quick Approval", description: "Pre-qualification in minutes, full approval within 24 hours" },
    { icon: Users, title: "Expert Guidance", description: "Dedicated finance specialists to guide you through the process" },
    { icon: CheckCircle, title: "Flexible Terms", description: "Tailored solutions from 12-84 months to suit your budget" }
  ];

  return (
    <Layout>
    <div className="min-h-screen bg-zinc-950 py-24">
      <div className="container mx-auto px-6 max-w-7xl space-y-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Finance Calculator */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card className="bg-zinc-900/80 luxury-shadow border-zinc-800 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center text-zinc-50">
                  <Calculator className="w-6 h-6 mr-3 text-red-500" /> Finance Calculator
                </CardTitle>
                <p className="text-zinc-400 mt-1">Estimate your weekly and monthly payments</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm text-zinc-300 block mb-2">
                    Vehicle Price: ${calculatorData.vehiclePrice?.toLocaleString() ?? 0}
                  </label>
                  <Slider
                    value={[calculatorData.vehiclePrice]}
                    onValueChange={([value]) => setCalculatorData({ ...calculatorData, vehiclePrice: value })}
                    max={200000}
                    min={10000}
                    step={1000}
                  />
                </div>

                <div>
                  <label className="text-sm text-zinc-300 block mb-2">
                    Deposit: ${calculatorData.deposit?.toLocaleString() ?? 0}
                  </label>
                  <Slider
                    value={[calculatorData.deposit]}
                    onValueChange={([value]) => setCalculatorData({ ...calculatorData, deposit: value })}
                    max={(calculatorData.vehiclePrice ?? 50000) * 0.5}
                    min={0}
                    step={1000}
                  />
                </div>

                <div>
                  <label className="text-sm text-zinc-300 block mb-2">
                    Loan Term: {calculatorData.term} months
                  </label>
                  <Slider
                    value={[calculatorData.term]}
                    onValueChange={([value]) => setCalculatorData({ ...calculatorData, term: value })}
                    min={12}
                    max={84}
                    step={6}
                  />
                </div>

                <div>
                  <label className="text-sm text-zinc-300 block mb-2">
                    Interest Rate: {calculatorData.interestRate}% p.a.
                  </label>
                  <Slider
                    value={[calculatorData.interestRate]}
                    onValueChange={([value]) => setCalculatorData({ ...calculatorData, interestRate: value })}
                    min={3}
                    max={15}
                    step={0.1}
                  />
                </div>

                {/* Estimated Payments */}
                <div className="bg-zinc-800 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-zinc-50 mb-4">Estimated Payments</h4>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-zinc-400 text-sm">Weekly</p>
                      <p className="text-2xl font-bold text-red-500">${payments.weekly.toFixed(0)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-zinc-400 text-sm">Monthly</p>
                      <p className="text-2xl font-bold text-red-500">${payments.monthly.toFixed(0)}</p>
                    </div>
                  </div>
                  <div className="text-center pt-4 border-t border-zinc-700">
                    <p className="text-zinc-400 text-sm">Total Amount Payable</p>
                    <p className="text-xl font-semibold text-zinc-50">
                      ${(payments.total + (calculatorData.deposit ?? 0)).toFixed(0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
            
          {/* Benefits + Pre-qualification */}
          <div className="space-y-8">
            {/* Benefits */}
            <Card className="bg-zinc-900/80 luxury-shadow border-zinc-800 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-2xl text-zinc-50">Why Choose Our Finance?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {benefits.map((b, i) => {
                    const Icon = b.icon;
                    return (
                      <div key={i} className="flex items-start space-x-4">
                        <div className="w-10 h-10 gradient-red rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-zinc-50" />
                        </div>
                        <div>
                          <h4 className="text-zinc-50 font-semibold">{b.title}</h4>
                          <p className="text-zinc-400 text-sm">{b.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-2xl text-zinc-50">Quick Pre-Qualification</CardTitle>
                <p className="text-zinc-400">
                  Check your eligibility in under 2 minutes
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="First Name"
                      className="bg-zinc-800 border-zinc-700 text-zinc-50"
                    />
                    <Input
                      placeholder="Last Name"
                      className="bg-zinc-800 border-zinc-700 text-zinc-50"
                    />
                  </div>
                  
                  <Input
                    placeholder="Email Address"
                    type="email"
                    className="bg-zinc-800 border-zinc-700 text-zinc-50"
                  />
                  
                  <Input
                    placeholder="Annual Income"
                    type="number"
                    className="bg-zinc-800 border-zinc-700 text-zinc-50"
                  />

                  <Button className="w-full gradient-red text-zinc-50 hover:opacity-90 font-semibold">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Check Pre-Qualification
                  </Button>

                  <p className="text-xs text-zinc-500">
                    Soft credit check only - no impact on your credit score
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </Layout>
  );
}
