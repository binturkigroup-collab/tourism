import React, { useState } from "react";
import { Button } from "@/Pages/Site/components/ui/button";
import { Input } from "@/Pages/Site/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Pages/Site/components/ui/select";
import { Search, X } from "lucide-react";
import SearchFilters from "@/Interfaces/Site/SearchFilters";
import BlockProps from "@/Interfaces/Site/BlockProps";
import {useTranslation} from "react-i18next";
import {Label} from "@/Pages/Site/components/ui/label";

interface AdvancedSearchProps {
  developers: BlockProps[];
  communities: BlockProps[];
  cities: BlockProps[];
  onSearch: (filters: SearchFilters) => void;
}

// export interface SearchFilters {
//   developer: string;
//   community: string;
//   city: string;
//   minPrice: string;
//   maxPrice: string;
// }

const AdvancedSearch = ({
  developers,
  communities,
  cities,
  onSearch,
}: AdvancedSearchProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    developerSlug: '',
    communitySlug: '',
    citySlug: '',
    minPrice: 0,
    maxPrice: 0,
  });

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters: SearchFilters = {
        developerSlug: '',
        communitySlug: '',
        citySlug: '',
        minPrice: 0,
        maxPrice: 0,
    };
    setFilters(emptyFilters);
    onSearch(emptyFilters);
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== "");
  const {t} = useTranslation();

  return (
    <div className="bg-accent border border-border rounded-lg p-4 md:p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Search className="w-5 h-5 text-secondary" />
        <h2 className="text-lg font-semibold text-foreground">{t('search')}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="flex flex-col items-start justify-start">
              <span>{t('dev')}</span>
              <Select
                  value={filters.developerSlug}
                  onValueChange={(value) => handleFilterChange("developerSlug", value)}
              >
                  <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Developer"/>
                  </SelectTrigger>
                  <SelectContent className="bg-accent border-border z-50">
                      {developers.map((dev) => (
                          <SelectItem key={'dev-' + dev.id} value={dev.slug} className="text-primary cursor-pointer">
                              {dev.title}
                          </SelectItem>
                      ))}
                  </SelectContent>
              </Select>
          </div>

          <div className="flex flex-col items-start justify-start">
              <span>{t('comm')}</span>
              <Select
                  value={filters.communitySlug}
                  onValueChange={(value) => handleFilterChange("communitySlug", value)}
              >
                  <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Community" />
                  </SelectTrigger>
                  <SelectContent className="bg-accent border-border z-50">
                      {communities.map((comm) => (
                          <SelectItem key={'comm-' + comm.id} value={comm.slug} className="text-primary cursor-pointer">
                              {comm.title}
                          </SelectItem>
                      ))}
                  </SelectContent>
              </Select>
          </div>

          <div className="flex flex-col items-start justify-start">
              <span>{t('city')}</span>

              <Select
                  value={filters.citySlug}
                  onValueChange={(value) => handleFilterChange("citySlug", value)}
              >
                  <SelectTrigger className="bg-accent text-primary">
                      <SelectValue placeholder="City" className="text-primary"/>
                  </SelectTrigger>
                  <SelectContent className="bg-accent border-border z-50">
                      {cities.map((city) => (
                          <SelectItem key={'city-' + city.id} value={city.slug} className="text-primary cursor-pointer">
                              {city.title}
                          </SelectItem>
                      ))}
                  </SelectContent>
              </Select>
          </div>

          <div className="flex flex-col items-start justify-start">
              <span>{t('min-price')}</span>
              <Input
                  type="number"
                  placeholder="Min Price (AED)"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                  className="bg-background"
              />
          </div>

          <div className="flex flex-col items-start justify-start">
              <span>{t('max-price')}</span>
              <Input
                  type="number"
                  placeholder="Max Price (AED)"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                  className="bg-background"
              />
          </div>



      </div>

      {hasActiveFilters && (
        <div className="mt-4 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4 mr-1" />
              {t('clear-filters')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;
