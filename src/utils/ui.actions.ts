
class UiActions {
    async fill(element: any, value: string) {
        await element.clear();
        await element.fill(value);
    }

    async getText(element: any): Promise<string> {
        return await element.textContent() || '';
    }
}

export default UiActions;