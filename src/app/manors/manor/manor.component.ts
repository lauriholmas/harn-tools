import { Component, OnInit } from '@angular/core';
import { CraftsmanGenerator } from '../shared/generators/craftsman-generator';
import { TenantGenerator } from '../shared/generators/tenant-generator';
import { YeomanGenerator } from '../shared/generators/yeoman-generator';
import {
  Manor,
  IManor,
  Topology,
  TopologyEffects
} from '../shared/models/manor.model';
import { ManorService } from '../shared/manor.service';
import { TenantOfficerGenerator } from '../shared/generators/tenant-officer.generator';
import { NumberGenerator } from '../../shared/generators/number-generator';
import { HouseholdGenerator } from '../shared/generators/household.generator';
import { CropGeneratorService } from '../shared/services/crop-generator.service';

@Component({
  selector: 'app-manor',
  templateUrl: './manor.component.html',
  styleUrls: ['./manor.component.scss']
})
export class ManorComponent implements OnInit {
  manor: Manor;
  dice: NumberGenerator;
  showGenerationInput: boolean;
  private _tg: TenantGenerator;
  private _cg: CraftsmanGenerator;
  private _mg: YeomanGenerator;
  private _to: TenantOfficerGenerator;
  private _hg: HouseholdGenerator;

  constructor(
    private manorService: ManorService,
    private cropService: CropGeneratorService
  ) {}

  ngOnInit() {
    this.dice = new NumberGenerator();
    this._tg = new TenantGenerator();
    this._cg = new CraftsmanGenerator();
    this._mg = new YeomanGenerator();
    this._to = new TenantOfficerGenerator();
    this._hg = new HouseholdGenerator();
    this.manor = this.manorService.getManor() as Manor;
    this._reset();
  }

  private _reset() {
    this.manorService.resetManor();
    this.manor.grossAcres = this.dice.rollTotal(6, 2) * 100 + 1000;
    this.manor.landQuality = parseFloat(
      (
        1 +
        this.dice.rollTotal(6, 5) / 100 -
        this.dice.rollTotal(6, 5) / 100
      ).toFixed(2)
    );
    this.manor.setFiefIndex();
    this.showGenerationInput = true;
    this.onTopologySelect();
  }

  onTopologySelect() {
    const woodlandRatio =
      TopologyEffects[this.manor.topology].woods -
      10 +
      this.dice.rollTotal(6, 3);
    this.manor.woodlandAcres = Math.floor(
      this.manor.grossAcres * woodlandRatio / 100
    );
    this.manor.clearedAcres = this.manor.grossAcres - this.manor.woodlandAcres;
  }

  /**
   * When gross acres is changed it recalculates cleared acres and woodland acres to the same percent.
   */
  onGrossAcresChange() {
    const oldTotal = this.manor.woodlandAcres + this.manor.clearedAcres;
    const woodlandPercent = this.manor.woodlandAcres / oldTotal;
    this.manor.woodlandAcres = Math.floor(
      this.manor.grossAcres * woodlandPercent
    );
    this.manor.clearedAcres = this.manor.grossAcres - this.manor.woodlandAcres;
  }

  onWoodlandAcresChange() {
    this.manor.clearedAcres = this.manor.grossAcres - this.manor.woodlandAcres;
  }

  onClearedAcresChange() {
    this.manor.woodlandAcres = this.manor.grossAcres - this.manor.clearedAcres;
  }

  onResetClick() {
    this._reset();
  }

  onGenerateClick() {
    this.showGenerationInput = false;
    this._tg.generateTenants(this.manor);
    this._cg.assignCraftsmen(this.manor);
    this._mg.recruitYeoman(this.manor);
    this._to.electOfficers(this.manor);
    this._hg.generateHousehold(this.manor);
    this.manor.setFiefIndex();
    this.cropService.generateCrops(this.manor);
  }

  topologyChoices(): string[] {
    const keys = Object.keys(Topology);
    return keys;
  }
}
