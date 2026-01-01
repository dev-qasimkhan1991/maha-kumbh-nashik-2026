import './App.css';

import React, { useState } from 'react';

import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Toast from './components/Toast/Toast';
import { useModal } from './hooks/useModal';
import { useToast } from './hooks/useToast';
import Accommodations from './pages/Accommodations/Accommodations';
import Attractions from './pages/Attractions/Attractions';
import Dashboard from './pages/Dashboard/Dashboard';
import Events from './pages/Events/Events';
import Locations from './pages/Locations/Locations';
import Zones from './pages/Zones/Zones';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast, showToast } = useToast();
  const { isOpen, openModal, closeModal } = useModal();

  const handleAddClick = () => {
    openModal(activeTab);
  };

  const renderPage = () => {
    const pages = {
      dashboard: <Dashboard />,
      events: <Events searchTerm={searchTerm} openModal={openModal} />,
      accommodations: <Accommodations searchTerm={searchTerm} openModal={openModal} />,
      attractions: <Attractions searchTerm={searchTerm} openModal={openModal} />,
      locations: <Locations searchTerm={searchTerm} />,
      zones: <Zones searchTerm={searchTerm} />
    };
    return pages[activeTab] || pages.dashboard;
  };

  return (
    <div className="app-container">
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="main-layout">
        <Header
          title={activeTab}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onAddClick={handleAddClick}
          showAddButton={activeTab !== 'dashboard' && activeTab !== 'zones' && activeTab !== 'locations'}
        />

        <Toast toast={toast} onClose={() => showToast(null)} />

        <main className="content-main">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;