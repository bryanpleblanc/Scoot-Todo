import { useState } from 'react';
import {
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Box,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

interface Props {
    addTodo: (
        title: string,
        description: string,
        dueDate: string | undefined,
        priority: number | string,
    ) => void;
}

const TodoForm = ({ addTodo }: Props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleDateChange = (date: Date) => {
        const convertedDate = dayjs(date).toISOString();
        setDueDate(convertedDate);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addTodo(title, description, dueDate, priority);
        setTitle('');
        setDescription('');
        setPriority('');
        setPriority('');
    };

    return (
        <Box
            sx={{ bgcolor: 'lightgray', borderRadius: '8px', padding: '16px' }}
        >
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Due Date"
                        fullWidth
                        inputFormat="MM/dd/yyyy"
                        onChange={(newValue: Date) => {
                            handleDateChange(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>

                <FormControl margin="normal" fullWidth>
                    <InputLabel id="priority-label">Priority</InputLabel>
                    <Select
                        labelId="priority-label"
                        value={priority}
                        onChange={(e) => {
                            if (typeof e.target.value === 'number') {
                                setPriority(Number(e.target.value));
                            } else {
                                setPriority('');
                            }
                        }}
                    >
                        <MenuItem value={1}>Low</MenuItem>
                        <MenuItem value={2}>Medium</MenuItem>
                        <MenuItem value={3}>High</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary">
                    Add Todo
                </Button>
            </form>
        </Box>
    );
};

export default TodoForm;
