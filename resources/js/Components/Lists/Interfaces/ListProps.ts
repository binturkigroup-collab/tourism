interface ListProps {
    limit: string,
    offset: number,
    search: string,
    count: number,
    next: () => void,
    loading: boolean,
    changeLimit: (val: string) => void,
    onSearch: (val: string) => void,
    activate?: (id: number, status: boolean) => void,
}

export default ListProps;
