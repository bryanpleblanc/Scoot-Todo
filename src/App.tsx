import { useState } from 'react';
import { TextField, Box, Stack, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import TodosData from './data/todos.json';
import { v4 as uuidv4 } from 'uuid';
import TodoForm from './components/TodoForm';
import './App.css';

type Todo = {
    id: string;
    title: string;
    description: string;
    priority?: number;
    dueDate: string;
};

const App = () => {
    const [todos, setTodos] = useState<Todo[]>(TodosData);
    const [searchQuery, setSearchQuery] = useState('');

    const handleDelete = (params: any) => {
        const updatedTodos = todos.filter((todo) => todo.id !== params.row.id);
        setTodos(updatedTodos);
    };

    const filteredTodos = todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const columns: GridColDef[] = [
        { field: 'title', headerName: 'Title', width: 150 },
        { field: 'description', headerName: 'Description', width: 250 },
        { field: 'priority', headerName: 'Priority', width: 100 },
        {
            field: 'dueDate',
            headerName: 'Due Date',
            width: 250,
            valueFormatter: (params) => {
                const date = new Date(params.value);
                const dateHumanReadable = date.toDateString();
                return dateHumanReadable;
            },
        },
        {
            field: 'delete',
            headerName: '',
            sortable: false,
            width: 50,
            renderCell: (params) => (
                <IconButton onClick={() => handleDelete(params)}>
                    <DeleteIcon />
                </IconButton>
            ),
        },
    ];

    const handleAddTodo = (
        title: string,
        description: string,
        dueDate: string,
        priority: number,
    ) => {
        const newTodo: Todo = {
            id: uuidv4(),
            title,
            description,
            dueDate,
            priority,
        };
        setTodos([...todos, newTodo]);
    };

    return (
        <>
            <Box sx={{ width: '50%' }}>
                <Stack spacing={2}>
                    <TodoForm addTodo={handleAddTodo} />
                    <TextField
                        label="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{ marginBottom: '1rem' }}
                    />
                    <DataGrid
                        rows={filteredTodos}
                        columns={columns}
                        autoHeight
                        pageSize={5}
                    />
                </Stack>
            </Box>
        </>
    );
};

export default App;
