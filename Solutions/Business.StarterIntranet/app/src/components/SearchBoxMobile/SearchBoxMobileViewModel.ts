// ========================================
// Search box View Model (Mobile)
// ========================================
import "../IKnockoutBindingHandlers";
import SearchBoxViewModel from "../SearchBox/SearchBoxViewModel";

class SearchBoxMobileViewModel extends SearchBoxViewModel {

    public displaySearchBox: KnockoutObservable<boolean>;
    public selectedIndex: KnockoutObservable<number>;
    public toggleUIElements: KnockoutComputed<void>;

    constructor() {

        super();

        this.displaySearchBox = ko.observable(false);
        this.selectedIndex = ko.observable(0);
        this.toggleUIElements = ko.computed(() => {

            // Give more space to the searchbox by hidding the burger menu and the language switcher
            if (this.displaySearchBox()) {

                // Be careful here, because there are multiple topnav components in the page, we must use CSS classes instead of ids on concerned DOM elements
                $(".navbar-header .navbar-toggle").hide();
                $(".mobile-intranetlogo").hide();
                $(".searchbar").css("width", "100%"); // Expand the search bar in the container
                $(".navbar-header").css("width", "100%");
            } else {
                // Reset to the default behavior (managed by Bootstrap, not by our code)
                $(".navbar-header .navbar-toggle").css("display", "");
                $(".searchbar").css("width", "");
                $(".navbar-header").css("width", "");
                $(".mobile-intranetlogo").show();
            }
        });

        if (this.inputQuery().length > 0) {

            // If a search query was already performed
            this.displaySearchBox(true);
        }

        ko.bindingHandlers.inputFocus = {

            init: (element, valueAccessor) => {

                const value = valueAccessor();
                ko.unwrap(value) ? $(element).focus() : $(element).blur();
            },
        };

    }

    public toggleSearchBox = () => {

        this.displaySearchBox(!this.displaySearchBox());
    }

    public toggleCategory = () => {

        if (this.selectedIndex() === (this.searchNavigationNodes().length - 1)) {
            // Reset the index
            this.selectedIndex(0);

        } else {
            this.selectedIndex(this.selectedIndex() + 1);
        }

        this.selectedCategory(this.searchNavigationNodes()[this.selectedIndex()]);
    }
}

export default SearchBoxMobileViewModel;
