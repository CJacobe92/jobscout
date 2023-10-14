import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select"

type PlanSelectProps = {
  subscription: string
}

const PlanSelect = ({subscription} : PlanSelectProps) => {
  return (
    <div className="flex items-center justify-between px-4 w-96">
      <p className="text-sm font-semibold text-gray-600">Subscription:</p>
      <Select>
        <SelectTrigger className="w-[170px] text-primary font-semibold rounded-xs border-primary">
          <SelectValue placeholder={subscription == 'bstandard' ? 'PBusiness Standard' : subscription == 'bpremium' ? 'Business Premium' : 'Enterprise'} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Available Plans</SelectLabel>
            <SelectItem value="bstandard">Business Standard</SelectItem>
            <SelectItem value="bpremium">Business Premium</SelectItem>
            <SelectItem value="enterprise">Enterprise</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default PlanSelect