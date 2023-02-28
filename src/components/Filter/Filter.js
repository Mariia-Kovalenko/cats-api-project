import Select from "react-select";
import ActionButton from "../../common/ActionButton/ActionButton";
import { LIMIT_OPTIONS, RELOAD, SEARCH } from "../../utils/_constants";
import { colourStyles } from "../../utils/_select-styles";

const Filter = ({
    breedsFilter,
    categoryFilter,
    limitFilter,
    onSearch,
    onReload,
}) => {
    return (
        <div className="filter">
            {breedsFilter?.show && (
                <div id="breeds-filter" className="filter__select">
                    <label className="label">Breed</label>
                    <Select
                        defaultValue={breedsFilter.defaultValue}
                        onChange={breedsFilter.onChange}
                        options={breedsFilter.options}
                        styles={colourStyles}
                    />
                </div>
            )}

            {categoryFilter && (
                <div id="category-filter" className="filter__select">
                    <label className="label">Category</label>
                    <Select
                        defaultValue={categoryFilter.defaultValue}
                        onChange={categoryFilter.onChange}
                        options={categoryFilter.options}
                        styles={colourStyles}
                    />
                </div>
            )}

            {limitFilter && (
                <div id="limit-filter" className="filter__select">
                    <label className="label">Limit</label>
                    <Select
                        defaultValue={limitFilter.defaultValue}
                        onChange={limitFilter.onChange}
                        options={LIMIT_OPTIONS}
                        styles={colourStyles}
                    />
                </div>
            )}
            <ActionButton
                action={SEARCH}
                onClick={onSearch}
                imageSrc={"images/search.svg"}
            />
            <ActionButton
                action={RELOAD}
                onClick={onReload}
                imageSrc={"images/reload.svg"}
            />
        </div>
    );
};

export default Filter;
