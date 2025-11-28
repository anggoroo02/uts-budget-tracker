        // State Management
        let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        let editingId = null;

        // Initialize
        function init() {
            setTodayDate();
            renderTransactions();
            updateSummary();
        }

        // Set today's date as default
        function setTodayDate() {
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('date').value = today;
        }

        // Format Currency
        function formatCurrency(amount) {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            }).format(amount);
        }

        // Format Date
        function formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', options);
        }

        // Show Alert
        function showAlert(message, type = 'success') {
            const alertContainer = document.getElementById('alertContainer');
            const alertDiv = document.createElement('div');
            alertDiv.className = `alert alert-${type}`;
            alertDiv.textContent = message;
            alertContainer.appendChild(alertDiv);
            setTimeout(() => alertDiv.remove(), 3000);
        }

        // Add Transaction
        document.getElementById('transactionForm').addEventListener('submit', (e) => {
            e.preventDefault();

            const description = document.getElementById('description').value;
            const amount = parseInt(document.getElementById('amount').value);
            const category = document.getElementById('category').value;
            const type = document.getElementById('type').value;
            const date = document.getElementById('date').value;
            const notes = document.getElementById('notes').value;

            if (!description || !amount || !category || !type || !date) {
                showAlert('Mohon lengkapi semua field yang diperlukan!', 'error');
                return;
            }

            const transaction = {
                id: Date.now(),
                description,
                amount,
                category,
                type,
                date,
                notes,
                createdAt: new Date().toISOString()
            };

            transactions.push(transaction);
            saveTransactions();
            renderTransactions();
            updateSummary();
            document.getElementById('transactionForm').reset();
            setTodayDate();
            showAlert('✅ Transaksi berhasil ditambahkan!');
        });

        // Save to localStorage
        function saveTransactions() {
            localStorage.setItem('transactions', JSON.stringify(transactions));
        }

        // Render Transactions
        function renderTransactions() {
            const listContainer = document.getElementById('transactionList');
            
            if (transactions.length === 0) {
                listContainer.innerHTML = '<div class="empty-state"><p>Belum ada transaksi. Mulai dengan menambah transaksi baru!</p></div>';
                return;
            }

            listContainer.innerHTML = transactions
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map(tx => `
                    <div class="transaction-item ${tx.type}">
                        <div>
                            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                                <h4>${tx.description}</h4>
                                <span style="font-size: 11px; background: rgba(0,0,0,0.1); padding: 2px 8px; border-radius: 4px;">${tx.category}</span>
                            </div>
                            <p>${formatDate(tx.date)}</p>
                            ${tx.notes ? `<p style="font-style: italic; margin-top: 4px;">📝 ${tx.notes}</p>` : ''}
                            <div class="transaction-actions">
                                <button class="btn btn-edit" onclick="openEditModal(${tx.id})">Edit</button>
                                <button class="btn btn-delete" onclick="deleteTransaction(${tx.id})">Hapus</button>
                            </div>
                        </div>
                        <div class="transaction-amount">${formatCurrency(tx.amount)}</div>
                    </div>
                `)
                .join('');
        }

        // Update Summary
        function updateSummary() {
            const income = transactions
                .filter(tx => tx.type === 'income')
                .reduce((sum, tx) => sum + tx.amount, 0);

            const expense = transactions
                .filter(tx => tx.type === 'expense')
                .reduce((sum, tx) => sum + tx.amount, 0);

            const balance = income - expense;

            document.getElementById('totalIncome').textContent = formatCurrency(income);
            document.getElementById('totalExpense').textContent = formatCurrency(expense);
            document.getElementById('totalBalance').textContent = formatCurrency(balance);
        }

        // Delete Transaction
        function deleteTransaction(id) {
            if (confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) {
                transactions = transactions.filter(tx => tx.id !== id);
                saveTransactions();
                renderTransactions();
                updateSummary();
                showAlert('Transaksi berhasil dihapus!');
            }
        }

        // Open Edit Modal
        function openEditModal(id) {
            const transaction = transactions.find(tx => tx.id === id);
            if (!transaction) return;

            editingId = id;
            document.getElementById('editDescription').value = transaction.description;
            document.getElementById('editAmount').value = transaction.amount;
            document.getElementById('editCategory').value = transaction.category;
            document.getElementById('editType').value = transaction.type;
            document.getElementById('editDate').value = transaction.date;
            document.getElementById('editNotes').value = transaction.notes;

            document.getElementById('editModal').classList.add('active');
        }

        // Close Modal
        function closeModal() {
            document.getElementById('editModal').classList.remove('active');
            editingId = null;
        }

        // Save Edit
        document.getElementById('editForm').addEventListener('submit', (e) => {
            e.preventDefault();

            const transaction = transactions.find(tx => tx.id === editingId);
            if (!transaction) return;

            transaction.description = document.getElementById('editDescription').value;
            transaction.amount = parseInt(document.getElementById('editAmount').value);
            transaction.category = document.getElementById('editCategory').value;
            transaction.type = document.getElementById('editType').value;
            transaction.date = document.getElementById('editDate').value;
            transaction.notes = document.getElementById('editNotes').value;

            saveTransactions();
            renderTransactions();
            updateSummary();
            closeModal();
            showAlert('✅ Transaksi berhasil diperbarui!');
        });

        // Modal Close Button
        document.querySelector('.close-btn').addEventListener('click', closeModal);

        // Close modal when clicking outside
        document.getElementById('editModal').addEventListener('click', (e) => {
            if (e.target.id === 'editModal') closeModal();
        });

        // Initialize on page load
        init();