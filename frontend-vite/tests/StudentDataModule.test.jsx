import {assert, beforeEach, describe, expect, test} from 'vitest';
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import StudentDataModule from '../src/components/StudentDataModule';

describe("toggle function", ()=>{
    beforeEach(() => {
        render(<StudentDataModule></StudentDataModule>)
    })
    test("should not show student data at the start", () => {
        expect(screen.queryByText(/Content/i)).not.toBeInTheDocument();
    })
    test("should show the content on accordion click",async () => {

        const title = screen.getByText(/Show/i);
        fireEvent.click(title)

        expect(await screen.findByText(/Content/i)).toBeInTheDocument();
    })
})
