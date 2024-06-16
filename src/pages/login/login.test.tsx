import {describe, expect, it} from 'vitest';
import { render, screen } from '@testing-library/react'; 
import LoginPage from './login';

describe('Login Page', () => {
    it('should render login page', ()=>{
        render(<LoginPage/>);
        // getBy -> throws error if element is not found
        // queryBy -> returns null if element not found
        // findBy -> returns Async
        expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByRole("button",{name: 'Log In'})).toBeInTheDocument();
    })
});
