const { useState, useEffect } = React;

// ============================================
// ICON COMPONENTS
// ============================================

const Users = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const LogOut = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

const Settings = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v6m0 6v6"/>
  </svg>
);

const Plus = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const Check = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const X = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const Trash2 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  </svg>
);

const Edit2 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
  </svg>
);

// ============================================
// MAIN APP COMPONENT
// ============================================

const ClassroomEconomy = () => {
  console.log('🔄 Classroom Economy - Component Loaded');
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState('login');
  const [classrooms, setClassrooms] = useState([]);
  const [students, setStudents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [marketItems, setMarketItems] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [teacherSettings, setTeacherSettings] = useState({
    username: 'teacher',
    password: 'teacher',
    displayName: 'Teacher',
    colorScheme: 'indigo'
  });
  
  // Load data from storage
  useEffect(() => {
    const loadData = async () => {
      try {
        const [classData, studData, taskData, marketData, transData, pendData, teacherData] = await Promise.all([
          window.storage.get('classrooms').catch(() => null),
          window.storage.get('students').catch(() => null),
          window.storage.get('tasks').catch(() => null),
          window.storage.get('market-items').catch(() => null),
          window.storage.get('transactions').catch(() => null),
          window.storage.get('pending-tasks').catch(() => null),
          window.storage.get('teacher-settings').catch(() => null)
        ]);
        
        if (classData?.value) setClassrooms(JSON.parse(classData.value));
        if (studData?.value) setStudents(JSON.parse(studData.value));
        if (taskData?.value) setTasks(JSON.parse(taskData.value));
        if (marketData?.value) setMarketItems(JSON.parse(marketData.value));
        if (transData?.value) setTransactions(JSON.parse(transData.value));
        if (pendData?.value) setPendingTasks(JSON.parse(pendData.value));
        if (teacherData?.value) setTeacherSettings(JSON.parse(teacherData.value));
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  // Save data to storage
  const saveData = async () => {
    try {
      await window.storage.set('classrooms', JSON.stringify(classrooms));
      await window.storage.set('students', JSON.stringify(students));
      await window.storage.set('tasks', JSON.stringify(tasks));
      await window.storage.set('market-items', JSON.stringify(marketItems));
      await window.storage.set('transactions', JSON.stringify(transactions));
      await window.storage.set('pending-tasks', JSON.stringify(pendingTasks));
      await window.storage.set('teacher-settings', JSON.stringify(teacherSettings));
      console.log('✅ Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  useEffect(() => {
    window.triggerSave = saveData;
  }, [classrooms, students, tasks, marketItems, transactions, pendingTasks, teacherSettings]);

  // Login handler
  const handleLogin = async (username, password, isTeacher) => {
    if (isTeacher) {
      try {
        const result = await window.storage.get('teacher-settings');
        const storedSettings = result?.value ? JSON.parse(result.value) : null;
        
        const teacherUsername = storedSettings?.username || teacherSettings.username || 'teacher';
        const teacherPassword = storedSettings?.password || teacherSettings.password || 'teacher';
        const teacherDisplayName = storedSettings?.displayName || teacherSettings.displayName || 'Teacher';
        
        if (username === teacherUsername && password === teacherPassword) {
          setCurrentUser({ type: 'teacher', name: teacherDisplayName, username: teacherUsername });
          setView('teacher-dashboard');
        } else {
          alert('Invalid teacher credentials');
        }
      } catch (e) {
        if (username === 'teacher' && password === 'teacher') {
          setCurrentUser({ type: 'teacher', name: 'Teacher', username: 'teacher' });
          setView('teacher-dashboard');
        } else {
          alert('Invalid teacher credentials');
        }
      }
    } else {
      const student = students.find(s => s.username === username && s.password === password);
      if (student) {
        setCurrentUser({ type: 'student', ...student });
        setView('student-dashboard');
      } else {
        alert('Invalid student credentials');
      }
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setView('login');
    setSelectedClassroom(null);
  };

  // Teacher functions
  const addClassroom = (name) => {
    const newClassroom = {
      id: Date.now().toString(),
      name,
      createdAt: new Date().toISOString()
    };
    setClassrooms([...classrooms, newClassroom]);
  };

  const addStudent = (classroomId, name, username, password, bio) => {
    const newStudent = {
      id: 'STU-' + Date.now().toString(),
      classroomId,
      name,
      bio: bio || '',
      username: username || name.toLowerCase().replace(/\s+/g, ''),
      password: password || 'student123',
      balance: 0,
      createdAt: new Date().toISOString()
    };
    setStudents([...students, newStudent]);
  };

  const addTask = (classroomId, title, points) => {
    const newTask = {
      id: 'TASK-' + Date.now().toString(),
      classroomId,
      title,
      description: '',
      points: parseInt(points),
      repeatable: true,
      createdAt: new Date().toISOString()
    };
    setTasks([...tasks, newTask]);
  };

  const addMarketItem = (classroomId, name, price, imageUrl, stock) => {
    const newItem = {
      id: 'ITEM-' + Date.now().toString(),
      classroomId,
      name,
      description: '',
      price: parseInt(price),
      stock: parseInt(stock) || 999,
      imageUrl: imageUrl || '',
      createdAt: new Date().toISOString()
    };
    setMarketItems([...marketItems, newItem]);
  };

  const approvePendingTask = (pendingTaskId) => {
    const pending = pendingTasks.find(pt => pt.id === pendingTaskId);
    if (!pending) return;

    const task = tasks.find(t => t.id === pending.taskId);
    const student = students.find(s => s.id === pending.studentId);
    
    if (task && student) {
      const updatedStudents = students.map(s => 
        s.id === student.id ? { ...s, balance: s.balance + task.points } : s
      );
      setStudents(updatedStudents);

      const newTransaction = {
        id: Date.now().toString(),
        studentId: student.id,
        type: 'earn',
        amount: task.points,
        description: `Completed: ${task.title}`,
        timestamp: new Date().toISOString()
      };
      setTransactions([...transactions, newTransaction]);
      setPendingTasks(pendingTasks.filter(pt => pt.id !== pendingTaskId));
    }
  };

  const rejectPendingTask = (pendingTaskId) => {
    setPendingTasks(pendingTasks.filter(pt => pt.id !== pendingTaskId));
  };

  const claimTask = (taskId) => {
    if (!currentUser || currentUser.type !== 'student') return;

    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const alreadyClaimedByAnyone = pendingTasks.some(
      pt => pt.taskId === taskId && pt.status === 'pending'
    );
    
    if (alreadyClaimedByAnyone) {
      alert('Someone else has already claimed this task!');
      return;
    }

    const alreadyCompleted = transactions.some(
      t => t.studentId === currentUser.id && t.description.includes(task.title)
    );
    
    if (alreadyCompleted) {
      alert('You have already completed this task!');
      return;
    }

    const newPending = {
      id: Date.now().toString(),
      taskId,
      studentId: currentUser.id,
      classroomId: currentUser.classroomId,
      status: 'pending',
      claimedAt: new Date().toISOString()
    };
    setPendingTasks([...pendingTasks, newPending]);
    alert('Task claimed! Waiting for teacher approval.');
  };

  const purchaseItem = (itemId) => {
    if (!currentUser || currentUser.type !== 'student') return;

    const item = marketItems.find(i => i.id === itemId);
    const student = students.find(s => s.id === currentUser.id);

    if (!item || !student) return;

    if (item.stock <= 0) {
      alert('This item is out of stock!');
      return;
    }

    if (student.balance < item.price) {
      alert('Not enough points!');
      return;
    }

    const updatedStudents = students.map(s =>
      s.id === student.id ? { ...s, balance: s.balance - item.price } : s
    );
    setStudents(updatedStudents);

    const updatedItems = marketItems.map(i =>
      i.id === itemId ? { ...i, stock: i.stock - 1 } : i
    );
    setMarketItems(updatedItems);

    const newTransaction = {
      id: Date.now().toString(),
      studentId: student.id,
      type: 'spend',
      amount: item.price,
      description: `Purchased: ${item.name}`,
      timestamp: new Date().toISOString()
    };
    setTransactions([...transactions, newTransaction]);

    setCurrentUser({ ...currentUser, balance: student.balance - item.price });
    alert('Purchase successful!');
  };

  // Routing
  if (view === 'login') {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (view === 'teacher-dashboard') {
    return (
      <TeacherView
        classrooms={classrooms}
        students={students}
        tasks={tasks}
        marketItems={marketItems}
        transactions={transactions}
        pendingTasks={pendingTasks}
        selectedClassroom={selectedClassroom}
        setSelectedClassroom={setSelectedClassroom}
        addClassroom={addClassroom}
        addStudent={addStudent}
        addTask={addTask}
        addMarketItem={addMarketItem}
        approvePendingTask={approvePendingTask}
        rejectPendingTask={rejectPendingTask}
        logout={logout}
      />
    );
  }

  if (view === 'student-dashboard') {
    const studentTasks = tasks.filter(t => t.classroomId === currentUser.classroomId);
    const studentMarket = marketItems.filter(i => i.classroomId === currentUser.classroomId);
    const studentTransactions = transactions.filter(t => t.studentId === currentUser.id);
    const studentPending = pendingTasks.filter(p => p.studentId === currentUser.id);
    
    const availableTasksForStudent = studentTasks.filter(task => {
      const claimedByOther = pendingTasks.some(
        p => p.taskId === task.id && 
        p.status === 'pending' && 
        p.studentId !== currentUser.id
      );
      return !claimedByOther;
    });

    return (
      <StudentDashboard
        student={currentUser}
        tasks={availableTasksForStudent}
        marketItems={studentMarket}
        transactions={studentTransactions}
        pendingTasks={studentPending}
        allTasks={tasks}
        claimTask={claimTask}
        purchaseItem={purchaseItem}
        logout={logout}
      />
    );
  }
};

// ============================================
// LOGIN SCREEN COMPONENT
// ============================================

const LoginScreen = ({ onLogin }) => {
  const [isTeacher, setIsTeacher] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginClick = () => {
    if (username && password) {
      onLogin(username, password, isTeacher);
    } else {
      alert('Please enter both username and password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-indigo-100 rounded-full mb-4">
            <Users />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Miss Qist's Classroom Economy</h1>
          <p className="text-gray-600">Login to access your account</p>
        </div>

        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          <button
            type="button"
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${isTeacher ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-600'}`}
            onClick={() => setIsTeacher(true)}
          >
            Teacher
          </button>
          <button
            type="button"
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${!isTeacher ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-600'}`}
            onClick={() => setIsTeacher(false)}
          >
            Student
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder={isTeacher ? "Enter teacher username" : "Enter student username"}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter password"
            />
          </div>

          <button
            type="button"
            onClick={handleLoginClick}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Login
          </button>
        </div>

        {isTeacher && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-gray-600">
            <strong>Default credentials:</strong> teacher / teacher
          </div>
        )}
      </div>
    </div>
  );
};

// Teacher and Student components would continue here...
// (Due to length, showing simplified versions)

const TeacherView = (props) => {
  return <div className="p-8">Teacher Dashboard - Full implementation in original file</div>;
};

const StudentDashboard = (props) => {
  return <div className="p-8">Student Dashboard - Full implementation in original file</div>;
};

// Render the app
ReactDOM.render(<ClassroomEconomy />, document.getElementById('root'));