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

//https://lo-victoria.com/vitest-blazing-fast-unit-test-framework
//https://www.robinwieruch.de/vitest-react-testing-library/
//https://medium.com/engineered-publicis-sapient/react-testing-techniques-d97e9dd8f081
//https://eternaldev.com/blog/testing-a-react-application-with-vitest