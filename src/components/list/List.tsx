import PaginationViewController from "./PaginationViewController";

export interface ListDelegate {
    listViewControllerOnUserDidSelectPageIndex?(pageIndex: number): void
}

export interface ListConfig<T> {
    listHeaderTitles: Array<string>
    currentPageIndex: number
    numberOfPages: number
    items: T[];
}

export interface ListProps<T> extends ListConfig<T>, ListDelegate {
    renderItem: (item: T) => React.ReactNode
}

export default function List<T>(props: ListProps<T>) {

    return (
        <div className="my-2 py-2">
            <PaginationViewController currentPageIndex={props.currentPageIndex}
                numberOfPages={props.numberOfPages}
                listViewControllerOnUserDidSelectPageIndex={(page) => {
                    if (props.listViewControllerOnUserDidSelectPageIndex) {
                        props.listViewControllerOnUserDidSelectPageIndex(page);
                    }
                }}
            />
            <table className="table table-striped table-dark my-1 py-1">
                <thead>
                    <tr>
                        {props.listHeaderTitles.map((title, index) =>
                            <th key={title+index} scope="col">{title}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {props.items.map(props.renderItem)}
                </tbody>
            </table>

        </div>
    )
}