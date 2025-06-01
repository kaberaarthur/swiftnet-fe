"use client"
import { useState } from 'react';
import { Button, Input, TabContent, TabPane, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

// Define interfaces for type safety
interface Plan {
  name: string;
  price: number;
}

interface ModalState {
  showModal: boolean;
  selectedPlan: Plan | null;
  phoneNumber: string;
  loading: boolean;
  successMessage: string;
}

export default function Home() {
  // State with typed interfaces
  const [activeTab, setActiveTab] = useState<string>('plans');
  const [modalState, setModalState] = useState<ModalState>({
    showModal: false,
    selectedPlan: null,
    phoneNumber: '',
    loading: false,
    successMessage: '',
  });

  // Define plans with Plan interface
  const plans: Plan[] = [
    { name: 'Hit & Run @10<br>2 Hour', price: 10 },
    { name: 'Sina Haraka @15<br>3 Hours', price: 15 },
    { name: '4_Hours', price: 20 },
    { name: 'WANTAM @30<br>1 Day', price: 30 },
  ];

  const toggleTab = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const activateVoucher = () => {
    console.log('Voucher activation requested');
  };

  const reconnect = () => {
    console.log('Reconnect requested');
  };

  const login = () => {
    console.log('Login requested');
  };

  const selectPlan = (plan: Plan) => {
    setModalState({
      ...modalState,
      showModal: true,
      selectedPlan: plan,
      phoneNumber: '',
      successMessage: '',
      loading: false,
    });
  };

  const cancelModal = () => {
    setModalState({ ...modalState, showModal: false });
  };

  const payNow = () => {
    console.log('Paying for plan:', modalState.selectedPlan);
    console.log('Phone number:', modalState.phoneNumber);
    setModalState({ ...modalState, loading: true });

    setTimeout(() => {
      setModalState({
        ...modalState,
        loading: false,
        successMessage: 'Your payment has been successful!',
      });
    }, 2000);
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen flex flex-col items-center font-sans">
      <div className="w-full max-w-md p-4 relative">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white">
            Swift<span className="text-yellow-400">Net</span>
          </h1>
          <p className="text-sm text-gray-300">Netpay Internet Access Portal</p>
          <p className="text-sm text-purple-400">Support Hotline: 0791 658502</p>
        </div>

        {/* Tabs */}
        <Nav tabs className="flex justify-between bg-gray-700 rounded-xl p-2 mb-6">
          <NavItem className="flex-1">
            <NavLink
              className={classnames({ 'bg-purple-600 text-white rounded-lg py-1': activeTab === 'plans', 'text-gray-300 hover:text-white': activeTab !== 'plans' })}
              onClick={() => toggleTab('plans')}
            >
              Plans
            </NavLink>
          </NavItem>
          <NavItem className="flex-1">
            <NavLink
              className={classnames({ 'bg-purple-600 text-white rounded-lg py-1': activeTab === 'voucher', 'text-gray-300 hover:text-white': activeTab !== 'voucher' })}
              onClick={() => toggleTab('voucher')}
            >
              Voucher
            </NavLink>
          </NavItem>
          <NavItem className="flex-1">
            <NavLink
              className={classnames({ 'bg-purple-600 text-white rounded-lg py-1': activeTab === 'reconnect', 'text-gray-300 hover:text-white': activeTab !== 'reconnect' })}
              onClick={() => toggleTab('reconnect')}
            >
              Reconnect
            </NavLink>
          </NavItem>
          <NavItem className="flex-1">
            <NavLink
              className={classnames({ 'bg-purple-600 text-white rounded-lg py-1': activeTab === 'login', 'text-gray-300 hover:text-white': activeTab !== 'login' })}
              onClick={() => toggleTab('login')}
            >
              Login
            </NavLink>
          </NavItem>
        </Nav>

        {/* Tab Content */}
        <TabContent activeTab={activeTab}>
          {/* Plans */}
          <TabPane tabId="plans">
            <h2 className="text-lg font-semibold mb-4">Select Your Package</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {plans.map((plan) => (
                <div key={plan.name} className="bg-gray-800 rounded-xl p-4 shadow-md text-center">
                  <h3 className="text-white font-semibold" dangerouslySetInnerHTML={{ __html: plan.name }} />
                  <p className="text-purple-300 text-sm mb-1">⚡ Unlimited</p>
                  <p className="text-lg font-bold text-yellow-400 mb-2">KSH {plan.price}/-</p>
                  <Button
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-1 px-4 rounded-sm"
                    onClick={() => selectPlan(plan)}
                  >
                    Buy Now
                  </Button>
                </div>
              ))}
            </div>
          </TabPane>

          {/* Voucher */}
          <TabPane tabId="voucher">
            <div className="bg-gray-800 p-4 rounded-xl shadow-md">
              <h2 className="text-xl text-purple-300 font-semibold mb-2">Voucher Recharge</h2>
              <p className="text-sm text-gray-400 mb-4">
                (Call admin for voucher recharge in case your payment is not successful)
              </p>
              <Input
                type="text"
                placeholder="Enter voucher code"
                className="mb-4 px-4 py-2 rounded border border-purple-500 text-black"
              />
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-1 px-4 rounded-sm"
                onClick={activateVoucher}
              >
                Activate voucher
              </Button>
            </div>
          </TabPane>

          {/* Reconnect */}
          <TabPane tabId="reconnect">
            <div className="bg-gray-800 p-4 rounded-xl shadow-md">
              <h2 className="text-xl text-orange-300 font-semibold mb-2">Reconnect Account</h2>
              <p className="text-sm text-gray-400 mb-4">
                (Enter MPESA code below from the payment you made. e.g. QAH9QWWZRR)
              </p>
              <Input
                type="text"
                placeholder="Enter Mpesa Code you paid with"
                className="mb-4 px-4 py-2 rounded border border-red-500 text-black"
              />
              <Button
                className="w-full bg-gradient-to-r from-red-500 to-yellow-500 text-white py-2 rounded font-semibold"
                onClick={reconnect}
              >
                Reconnect
              </Button>
            </div>
          </TabPane>

          {/* Login */}
          <TabPane tabId="login">
            <div className="bg-gray-800 p-4 rounded-xl shadow-md">
              <h2 className="text-xl text-green-400 font-semibold mb-2 text-center">WIFI LOGIN</h2>
              <p className="text-sm text-gray-400 mb-4 text-center">
                (Enter your username plus password to login.)
              </p>
              <Input
                type="text"
                placeholder="Username"
                className="mb-3 px-4 py-2 rounded border border-gray-300 text-black"
              />
              <Input
                type="password"
                placeholder="Password"
                className="mb-4 px-4 py-2 rounded border border-gray-300 text-black"
              />
              <Button
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-2 rounded font-semibold"
                onClick={login}
              >
                LOGIN
              </Button>
            </div>
          </TabPane>
        </TabContent>

        {/* Modal */}
        <Modal isOpen={modalState.showModal} toggle={cancelModal} centered className="bg-gray-900 text-white rounded-xl">
          <ModalHeader toggle={cancelModal} className="border-0">
            <h2 className="text-xl font-bold text-green-400">Confirm Payment</h2>
          </ModalHeader>
          <ModalBody>
            <Input
              type="tel"
              value={modalState.phoneNumber}
              onChange={(e) => setModalState({ ...modalState, phoneNumber: e.target.value })}
              placeholder="Enter phone number"
              className="mb-3 px-3 py-2 text-black rounded border border-gray-500"
            />
            <p className="mb-4">
              Pay Kshs. <span className="text-yellow-300 font-bold">{modalState.selectedPlan?.price}</span> with M-Pesa
            </p>
            {modalState.loading && (
              <div className="text-center mb-2">
                <FontAwesomeIcon icon={faSpinner} spin className="text-green-400 text-2xl" />
                <p className="text-sm mt-2">Processing Payment...</p>
              </div>
            )}
            {modalState.successMessage && (
              <div className="text-center text-green-400 font-semibold mb-3">
                {modalState.successMessage}
              </div>
            )}
          </ModalBody>
          <ModalFooter className="border-0 flex justify-between space-x-2">
            <Button
              className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded text-white font-semibold"
              onClick={payNow}
            >
              Pay Now
            </Button>
            <Button
              className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded text-white font-semibold"
              onClick={cancelModal}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}