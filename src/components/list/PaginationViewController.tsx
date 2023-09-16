import { Pagination } from "react-bootstrap";

interface PaginationProps<T> {
    currentPageIndex: number
    numberOfPages: number
    listViewControllerOnUserDidSelectPageIndex?(pageIndex: number): void
}

export default function PaginationViewController<T>(props: PaginationProps<T>) {

    const pages = Array<number>()

    for (let i = 0; i < props.numberOfPages; i++) {
        pages.push(i + 1)
    }

    const setPage = (page: number) => {
        if (props.listViewControllerOnUserDidSelectPageIndex) {
            props.listViewControllerOnUserDidSelectPageIndex(page - 1);
        }
    }

    return (
        <Pagination color="secondary">
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={(props.currentPageIndex + 1) === page}
                    onClick={() => setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    )
}