import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import {
    Checkbox,
    Dropdown,
    SearchInputSmall,
    Table,
    TableAction,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableHeadCellSort,
    TableRow
} from '../../../components';

// Styles
import TableWrapper from './styles';

// Default props
const defaultProps = {
    data: [],
    loading: true,
    onActivate: undefined,
    onDeactivate: undefined
};

// Prop types
const propTypes = {
    data: PropTypes.instanceOf(Array),
    id: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    rowActions: PropTypes.func.isRequired,
    onActivate: PropTypes.func,
    onDeactivate: PropTypes.func,
    onDelete: PropTypes.func.isRequired
};

class EntitiesTable extends Component {
    state = {
        checked: []
    };

    list = new Set();

    getTableBulkActions = () => {
        const { onDelete, onActivate, onDeactivate } = this.props;
        const { checked } = this.state;

        const actions = [['Delete', () => onDelete({
            count: checked.length,
            bannersId: checked
        })]];

        if (onActivate) {
            actions.push(['Activate', () => onActivate(checked)]);
        }

        if (onDeactivate) {
            actions.push(['Deactivate', () => onDeactivate(checked)]);
        }

        return actions;
    };

     handleCheck = ({ id, value }) => {
         const { checked } = this.state;

         if (!value) {
             this.setState({
                 checked: checked.filter(checkedId => checkedId !== id)
             });

             return;
         }

         this.setState({
             checked: [id, ...checked]
         });
     };

    handleBulkCheck = ({ value }) => {
        if (value) {
            this.setState({ checked: Array.from(this.list) });
            return;
        }

        this.setState({ checked: [] });
    };

    componentDidUpdate(prevProps) {
        const { data } = this.props;

        if (prevProps.data.length !== data.length) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ checked: [] });
        }
    }

    render() {
        const {
            id: tableId,
            loading,
            data,
            rowActions
        } = this.props;
        const { checked } = this.state;

        this.list.clear();

        return (
            <TableWrapper>
                <Table
                    data={data}
                    id={tableId}
                    loading={loading}
                    limit={5}
                    sortableColumns={['id', 'name']}
                    spacing="0 40px"
                >
                    <SearchInputSmall>
                        <Dropdown
                            actions={this.getTableBulkActions()}
                            disabled={!checked.length}
                            title={`Bulk actions (${checked.length})`}
                        />
                    </SearchInputSmall>
                    <TableHead>
                        <TableHeadCell>
                            <Checkbox
                                id="check_all"
                                value={!!checked.length}
                                onChange={this.handleBulkCheck}
                            />
                        </TableHeadCell>
                        <TableHeadCellSort sortKey="id" isIdCell>Id</TableHeadCellSort>
                        <TableHeadCellSort sortKey="name">Model Name</TableHeadCellSort>
                        <TableHeadCellSort sortKey="name">Table Name</TableHeadCellSort>
                        <TableHeadCell isActionCell>Actions</TableHeadCell>
                    </TableHead>
                    <TableBody>
                        {
                            rowData => rowData.map((row) => {
                                const {
                                    id,
                                    modelName,
                                    tableName
                                } = row;

                                this.list.add(id);

                                return (
                                    <TableRow key={id}>
                                        <TableCell isIdCell>
                                            <Checkbox
                                                id={id}
                                                onChange={this.handleCheck}
                                                value={checked.includes(id)}
                                            />
                                        </TableCell>
                                        <TableCell isIdCell>{id}</TableCell>
                                        <TableCell>{modelName}</TableCell>
                                        <TableCell>{tableName}</TableCell>
                                        <TableAction actions={rowActions(row) || []} />
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            </TableWrapper>
        );
    }
}

EntitiesTable.defaultProps = defaultProps;
EntitiesTable.propTypes = propTypes;

export default EntitiesTable;
