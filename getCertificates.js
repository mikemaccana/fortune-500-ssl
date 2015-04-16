var request = require('request'),
	fs = require('fs');

var log = console.log.bind(console);

var fortune500 = {
	"Wal-Mart Stores":"www.corporate.walmart.com",
	"Exxon Mobil":"www.exxonmobil.com",
	"Chevron":"www.chevron.com",
	"Berkshire Hathaway":"www.berkshirehathaway.com",
	"Apple":"www.apple.com",
	"Phillips 66":"www.phillips66.com",
	"General Motors":"www.gm.com",
	"Ford Motor":"www.ford.com",
	"General Electric":"www.ge.com",
	"Valero Energy":"www.valero.com",
	"AT&T":"www.att.com",
	"CVS Caremark":"info.cvscaremark.com",
	"Fannie Mae":"www.fanniemae.com",
	"UnitedHealth Group":"www.unitedhealthgroup.com",
	"McKesson":"www.mckesson.com",
	"Verizon Communications":"www.verizon.com",
	"Hewlett-Packard":"www.hp.com",
	"J.P. Morgan Chase & Co.":"www.jpmorganchase.com",
	"Costco Wholesale":"www.costco.com",
	"Express Scripts Holding":"www.express-scripts.com",
	"Bank of America":"www.bankofamerica.com",
	"Cardinal Health":"www.cardinal.com",
	"International Business Machines":"www.ibm.com",
	"Kroger":"www.thekrogerco.com",
	"Marathon Petroleum":"www.marathonpetroleum.com",
	"Citigroup":"www.citigroup.com",
	"Archer Daniels Midland":"www.adm.com",
	"AmerisourceBergen":"www.amerisourcebergen.com",
	"Wells Fargo":"www.wellsfargo.com",
	"Boeing":"www.boeing.com",
	"Procter & Gamble":"www.pg.com",
	"Freddie Mac":"www.freddiemac.com",
	"Home Depot":"www.homedepot.com",
	"Microsoft":"www.microsoft.com",
	"Amazon.com":"www.amazon.com",
	"Target":"www.target.com",
	"Walgreen Co.":"www.walgreens.com",
	"WellPoint":"www.wellpoint.com",
	"Johnson & Johnson":"www.jnj.com",
	"American International Group":"www.aig.com",
	"State Farm Insurance Cos.":"www.statefarm.com",
	"MetLife":"www.metlife.com",
	"PepsiCo":"www.pepsico.com",
	"Comcast":"www.comcastcorporation.com",
	"United Technologies":"www.utc.com",
	"Google":"www.google.com",
	"ConocoPhillips":"www.conocophillips.com",
	"Dow Chemical":"www.dow.com",
	"Caterpillar":"www.caterpillar.com",
	"United Parcel Service":"www.ups.com",
	"Pfizer":"www.pfizer.com",
	"Lowe's Companies":"www.lowes.com",
	"Intel Corporation":"www.intel.com",
	"Energy Transfer Equity, L.P.":"www.energytransfer.com",
	"Cisco Systems, Inc.":"www.cisco.com",
	"Enterprise Products Partners L.P.":"www.enterpriseproducts.com",
	"Aetna Inc.":"www.aetna.com",
	"The Coca-Cola Company":"www.coca-colacompany.com",
	"Lockheed Martin Corporation":"www.lockheedmartin.com",
	"Best Buy Co., Inc.":"www.bestbuy.com",
	"The Walt Disney Company":"www.disney.com",
	"CHS Inc.":"www.chsinc.com",
	"Sysco Corporation":"www.sysco.com",
	"FedEx Corporation":"www.fedex.com",
	"Merck & Co., Inc.":"www.merck.com",
	"INTL FCStone Inc.":"www.intlfcstone.com",
	"Safeway Inc.":"www.safeway.com",
	"Johnson Controls, Inc.":"www.johnsoncontrols.com",
	"Ingram Micro Inc.":"www.ingrammicro.com",
	"Plains GP Holdings, L.P.":"www.plainsallamerican.com",
	"World Fuel Services Corporation":"www.wfscorp.com",
	"Prudential Financial, Inc.":"www.prudential.com",
	"Humana Inc.":"www.humana.com",
	"The Goldman Sachs Group, Inc.":"www.gs.com",
	"Tesoro Corporation":"www.tsocorp.com",
	"Liberty Mutual Holding Company Inc.":"www.libertymutual.com",
	"Honeywell International Inc.":"www.honeywell.com",
	"United Continental Holdings, Inc.":"www.unitedcontinentalholdings.com",
	"HCA Holdings, Inc.":"www.hcahealthcare.com",
	"Deere & Company":"www.deere.com",
	"Delta Air Lines, Inc.":"www.delta.com",
	"Oracle Corporation":"www.oracle.com",
	"Morgan Stanley":"www.morganstanley.com",
	"Hess Corporation":"www.hess.com",
	"Twenty-First Century Fox, Inc.":"www.21cf.com",
	"E.I. du Pont de Nemours and Company":"www.dupont.com",
	"Sears Holdings Corporation":"www.searsholdings.com",
	"New York Life Insurance Company":"www.newyorklife.com",
	"Mondelez International, Inc.":"www.mondelezinternational.com",
	"American Express Company":"www.americanexpress.com",
	"Nationwide Mutual Insurance Co.":"www.nationwide.com",
	"The Allstate Corporation":"www.allstate.com",
	"Tyson Foods, Inc.":"www.tysonfoods.com",
	"Supervalu Inc.":"www.supervalu.com",
	"TIAA-CREF":"www.tiaa-cref.org",
	"Massachusetts Mutual Life Insurance Company":"www.massmutual.com",
	"CIGNA Corporation":"www.cigna.com",
	"DIRECTV":"www.directv.com",
	"General Dynamics Corporation":"www.generaldynamics.com",
	"Philip Morris International Inc.":"www.pmi.com",
	"3M Company":"www.3m.com",
	"Time Warner Inc.":"www.timewarner.com",
	"Halliburton Company":"www.halliburton.com",
	"Publix Super Markets, Inc.":"www.publix.com",
	"International Paper Company":"www.internationalpaper.com",
	"McDonald's Corporation":"www.mcdonalds.com",
	"Macy's, Inc.":"www.macysinc.com",
	"The TJX Companies, Inc.":"www.tjx.com",
	"Fluor Corporation":"www.fluor.com",
	"Northwestern Mutual Life Insurance Company,Inc.":"www.northwesternmutual.com",
	"Tech Data Corporation":"www.techdata.com",
	"American Airlines Group Inc.":"www.aa.com",
	"The Hartford Financial Services Group, Inc.":"www.thehartford.com",
	"The Travelers Companies, Inc.":"www.travelers.com",
	"Nike, Inc.":"www.nikeinc.com",
	"Occidental Petroleum Corporation":"www.oxy.com",
	"Avnet, Inc.":"www.avnet.com",
	"Rite Aid Corporation":"www.riteaid.com",
	"Exelon Corporation":"www.exeloncorp.com",
	"Qualcomm Incorporated":"www.qualcomm.com",
	"Emerson Electric Co.":"www.emerson.com",
	"Northrop Grumman Corporation":"www.northropgrumman.com",
	"Duke Energy Corporation":"www.duke-energy.com",
	"Capital One Financial Corporation":"www.capitalone.com",
	"Aflac Incorporated":"www.aflac.com",
	"Raytheon Company":"www.raytheon.com",
	"Staples, Inc.":"www.staples.com",
	"EMC Corporation":"www.emc.com",
	"Eli Lilly and Company":"www.lilly.com",
	"Alcoa Inc.":"www.alcoa.com",
	"National Oilwell Varco, Inc.":"www.nov.com",
	"Baker Hughes Incorporated":"www.bakerhughes.com",
	"US Foods, Inc.":"www.usfoods.com",
	"Time Warner Cable Inc.":"www.twc.com",
	"Union Pacific Corporation":"www.up.com",
	"Abbott Laboratories":"www.abbott.com",
	"Xerox Corporation":"www.xerox.com",
	"Arrow Electronics, Inc":"www.arrow.com",
	"Kimberly-Clark Corporation":"www.kimberly-clark.com",
	"U.S. Bancorp":"www.usbank.com",
	"United Services Automobile Association":"www.usaa.com",
	"Freeport-McMoRan Copper & Gold Inc.":"www.fcx.com",
	"Icahn Enterprises L.P.":"www.ielp.com",
	"ManpowerGroup Inc.":"www.manpowergroup.com",
	"HollyFrontier Corporation":"www.hollyfrontier.com",
	"Global Partners LP":"www.globalp.com",
	"The Goodyear Tire & Rubber Company":"www.goodyear.com",
	"PBF Energy Inc.":"www,pbfenergy.com",
	"Danaher Corporation":"www.danaher.com",
	"Nucor Corporation":"www.nucor.com",
	"Kohl's Corporation":"www.kohlscorporation.com",
	"AbbVie Inc.":"www.abbvie.com",
	"Whirlpool Corporation":"www.whirlpoolcorp.com",
	"Amgen Inc.":"www.amgen.com",
	"Jabil Circuit, Inc.":"www.jabil.com",
	"Kraft Foods Group, Inc.":"www.kraftfoodsgroup.com",
	"The Progressive Corporation":"www.progressive.com",
	"CenturyLink, Inc.":"www.centurylink.com",
	"General Mills, Inc.":"www.generalmills.com",
	"Southwest Airlines Co.":"www.southwest.com",
	"Altria Group, Inc.":"www.altria.com",
	"AutoNation, Inc.":"www.autonation.com",
	"Chesapeake Energy Corporation":"www.chk.com",
	"Dollar General Corporation":"www.dollargeneral.com",
	"TRW Automotive Holdings Corp.":"www.trw.com",
	"United States Steel Corporation":"www.ussteel.com",
	"Colgate-Palmolive Company":"www.colgatepalmolive.com",
	"Cummins Inc.":"www.cummins.com",
	"PACCAR Inc":"www.paccar.com",
	"The Southern Company":"www.southerncompany.com",
	"Illinois Tool Works Inc.":"www.itw.com",
	"The PNC Financial Services Group, Inc.":"www.pnc.com",
	"Medtronic, Inc.":"www.medtronic.com",
	"The AES Corporation":"www.aes.com",
	"Murphy USA Inc.":"corporate.murphyusa.com",
	"Bristol-Myers Squibb Company":"www.bms.com",
	"Lear Corporation":"www.lear.com",
	"The Gap, Inc.":"www.gapinc.com",
	"Apache Corporation":"www.apachecorp.com",
	"eBay Inc.":"www.ebayinc.com",
	"The Bank of New York Mellon Corporation":"www.bnymellon.com",
	"CBS Corporation":"www.cbscorporation.com",
	"PG&E Corporation":"www.pge.com",
	"ConAgra Foods, Inc.":"www.conagrafoods.com",
	"Computer Sciences Corporation":"www.csc.com",
	"American Electric Power Company, Inc.":"www.aep.com",
	"Western Digital Corporation":"www.westerndigital.com",
	"Marathon Oil Corporation":"www.marathonoil.com",
	"Baxter International Inc.":"www.baxter.com",
	"PPG Industries, Inc.":"www.ppg.com",
	"NextEra Energy, Inc.":"www.nexteraenergy.com",
	"Community Health Systems, Inc.":"www.chs.net",
	"Loews Corporation":"www.loews.com",
	"Penske Automotive Group, Inc.":"www.penskeautomotive.com",
	"FirstEnergy Corp.":"www.firstenergycorp.com",
	"Starbucks Corporation":"www.starbucks.com",
	"Monsanto Company":"www.monsanto.com",
	"Kellogg Company":"www.kelloggcompany.com",
	"Land O'Lakes, Inc.":"www.landolakesinc.com",
	"ONEOK, Inc.":"www.oneok.com",
	"Omnicom Group Inc.":"www.omnicomgroup.com",
	"Anadarko Petroleum Corporation":"www.anadarko.com",
	"EOG Resources, Inc.":"www.eogresources.com",
	"DISH Network Corporation":"www.dish.com",
	"Genuine Parts Company":"www.genpt.com",
	"Kinder Morgan, Inc.":"www.kindermorgan.com",
	"Waste Management, Inc.":"www.wm.com",
	"The Chubb Corporation":"www.chubb.com",
	"Aramark Holdings Corporation":"www.aramark.com",
	"Viacom Inc.":"www.viacom.com",
	"Las Vegas Sands Corp.":"www.sands.com",
	"Dominion Resources, Inc.":"www.dom.com",
	"Ecolab Inc.":"www.ecolab.com",
	"Smithfield Foods, Inc.":"www.smithfieldfoods.com",
	"Thermo Fisher Scientific Inc.":"www.thermofisher.com",
	"Yum! Brands, Inc.":"www.yum.com",
	"Parker-Hannifin Corporation":"www.parker.com",
	"Whole Foods Market, Inc.":"www.wholefoodsmarket.com",
	"Marriott International, Inc.":"www.marriott.com",
	"C. H. Robinson Worldwide, Inc.":"www.chrobinson.com",
	"L-3 Communications Holdings, Inc.":"www.l-3com.com",
	"Edison International":"www.edisoninvestor.com",
	"Toys R Us, Inc.":"www.toysrusinc.com",
	"Nordstrom, Inc.":"www.nordstrom.com",
	"Consolidated Edison, Inc.":"www.conedison.com",
	"Marsh & McLennan Companies, Inc.":"www.mmc.com",
	"Texas Instruments Incorporated":"www.ti.com",
	"Textron Inc.":"www.textron.com",
	"Tenet Healthcare Corporation":"www.tenethealth.com",
	"DaVita HealthCare Partners Inc.":"www.davita.com",
	"CSX Corporation":"www.csx.com",
	"Lincoln National Corporation":"www.lfg.com",
	"Praxair, Inc.":"www.praxair.com",
	"PPL Corporation":"www.pplweb.com",
	"J.C. Penney Company, Inc.":"www.jcpenney.com",
	"Peter Kiewit Sons', Inc.":"www.kiewit.com",
	"Jacobs Engineering Group Inc.":"www.jacobs.com",
	"Visa Inc.":"www.corporate.visa.com",
	"H.J. Heinz Company":"www.heinz.com",
	"CarMax, Inc.":"www.carmax.com",
	"V.F. Corporation":"www.vfc.com",
	"Entergy Corporation":"www.entergy.com",
	"Automatic Data Processing, Inc.":"www.adp.com",
	"NRG Energy, Inc.":"www.nrgenergy.com",
	"Guardian Life Ins. Co. of America":"www.guardianlife.com",
	"Liberty Interactive Corporation":"www.libertyinteractive.com",
	"Norfolk Southern Corporation":"www.nscorp.com",
	"Office Depot, Inc.":"www.officedepot.com",
	"Ameriprise Financial, Inc.":"www.ameriprise.com",
	"Gilead Sciences, Inc.":"www.gilead.com",
	"Centene Corporation":"www.centene.com",
	"Leucadia National Corporation":"www.leucadia.com",
	"Huntsman Corporation":"www.huntsman.com",
	"Health Net, Inc.":"www.healthnet.com",
	"Stanley Black & Decker, Inc.":"www.stanleyblackanddecker.com",
	"URS Corporation":"www.urs.com",
	"Xcel Energy Inc.":"www.xcelenergy.com",
	"Bed Bath & Beyond Inc.":"www.bedbathandbeyond.com",
	"Navistar International Corporation":"www.navistar.com",
	"Synnex Corporation":"www.synnex.com",
	"First Data Corporation":"www.firstdata.com",
	"AGCO Corporation":"www.agcocorp.com",
	"L Brands, Inc.":"www.lb.com",
	"Hertz Global Holdings, Inc.":"www.hertz.com",
	"CDW Corporation":"www.cdw.com",
	"CST Brands, Inc.":"www.cstbrands.com",
	"Sempra Energy":"www.sempra.com",
	"R.R. Donnelley & Sons Company":"www.rrdonnelley.com",
	"BB&T Corporation":"www.bbt.com",
	"Devon Energy Corporation":"www.devonenergy.com",
	"Family Dollar Stores, Inc.":"www.familydollar.com",
	"Unum Group":"www.unum.com",
	"Ally Financial Inc.":"www.ally.com",
	"Reinsurance Group of America, Incorporated":"www.rgare.com",
	"State Street Corporation":"www.statestreet.com",
	"Air Products & Chemicals, Inc.":"www.airproducts.com",
	"Ross Stores, Inc.":"www.rossstores.com",
	"The Sherwin-Williams Company":"www.sherwin.com",
	"The Est?ö£?îÉe Lauder Companies Inc.":"www.elcompanies.com",
	"BlackRock, Inc.":"www.blackrock.com",
	"Western Refining, Inc.":"www.wnr.com",
	"Avon Products, Inc.":"www.avoncompany.com",
	"The Mosaic Company":"www.mosaicco.com",
	"Public Service Enterprise Group Incorporated":"www.pseg.com",
	"Dean Foods Company":"www.deanfoods.com",
	"Cameron International Corporation":"www.c-a-m.com",
	"MGM Resorts International":"www.mgmresorts.com",
	"KKR & Co. L.P.":"www.kkr.com",
	"Hilton Worldwide Holdings Inc.":"www.hiltonworldwide.com",
	"DTE Energy Company":"www.dteenergy.com",
	"Genworth Financial, Inc.":"www.genworth.com",
	"Henry Schein, Inc.":"www.henryschein.com",
	"Rock-Tenn Company":"www.rocktenn.com",
	"WellCare Health Plans, Inc.":"www.wellcare.com",
	"W.W. Grainger, Inc.":"www.grainger.com",
	"Discover Financial Services":"www.discoverfinancial.com",
	"Eastman Chemical Company":"www.eastman.com",
	"Principal Financial Group, Inc.":"www.principal.com",
	"Reliance Steel & Aluminum Co.":"www.rsac.com",
	"AutoZone, Inc.":"www.autozone.com",
	"Dover Corporation":"www.dovercorporation.com",
	"Micron Technology, Inc.":"www.micron.com",
	"Owens & Minor, Inc.":"www.owens-minor.com",
	"Assurant, Inc.":"www.assurant.com",
	"GameStop Corp.":"www.gamestopcorp.com",
	"Stryker Corporation":"www.stryker.com",
	"Group 1 Automotive, Inc.":"www.group1auto.com",
	"Cognizant Technology Solutions Corporation":"www.cognizant.com",
	"Sonic Automotive, Inc.":"www.sonicautomotive.com",
	"Autoliv, Inc.":"www.autoliv.com",
	"Hormel Foods Corporation":"www.hormelfoods.com",
	"Motorola Solutions, Inc.":"www.motorolasolutions.com",
	"Crown Holdings, Inc.":"www.crowncork.com",
	"SunTrust Banks, Inc.":"www.suntrust.com",
	"Campbell Soup Company":"www.campbellsoupcompany.com",
	"Fidelity National Financial, Inc.":"www.fnf.com",
	"HD Supply Holdings, Inc.":"www.hdsupply.com",
	"Caesars Entertainment Corporation":"www.caesars.com",
	"Darden Restaurants, Inc.":"www.darden.com",
	"Weyerhaeuser Company":"www.weyerhaeuser.com",
	"Ball Corporation":"www.ball.com",
	"Precision Castparts Corp.":"www.precast.com",
	"Masco Corporation":"www.masco.com",
	"Universal Health Services, Inc.":"www.uhsinc.com",
	"Republic Services, Inc.":"www.republicservices.com",
	"MasterCard Incorporated":"www.mastercard.com",
	"Newmont Mining Corporation":"www.newmont.com",
	"Broadcom Corporation":"www.broadcom.com",
	"Reynolds American Inc.":"www.reynoldsamerican.com",
	"PVH Corp.":"www.pvh.com",
	"Charter Communications, Inc.":"www.charter.com",
	"AECOM Technology Corporation":"www.aecom.com",
	"CenterPoint Energy, Inc.":"www.centerpointenergy.com",
	"Pacific Life":"www.pacificlife.com",
	"Thrivent Financial for Lutherans":"www.thrivent.com",
	"Becton, Dickinson and Company":"www.bd.com",
	"Franklin Resources, Inc.":"www.franklinresources.com",
	"Tenneco Inc.":"www.tenneco.com",
	"TravelCenters of America LLC":"www.tatravelcenters.com",
	"Avis Budget Group, Inc.":"www.avisbudgetgroup.com",
	"Facebook, Inc.":"www.facebook.com",
	"Dollar Tree, Inc.":"www.dollartree.com",
	"Corning Incorporated":"www.corning.com",
	"Ashland Inc.":"www.ashland.com",
	"Sealed Air Corporation":"www.sealedair.com",
	"Core-Mark Holding Company, Inc.":"www.core-mark.com",
	"Oshkosh Corporation":"www.oshkoshcorporation.com",
	"Coca-Cola Enterprises, Inc.":"www.cokecce.com",
	"WESCO International, Inc.":"www.wesco.com",
	"Applied Materials, Inc.":"www.appliedmaterials.com",
	"Visteon Corporation":"www.visteon.com",
	"BorgWarner Inc.":"www.borgwarner.com",
	"Spectrum Group International, Inc.":"www.spectrumgi.com",
	"Oaktree Capital Group, LLC":"www.oaktreecapital.com",
	"Steel Dynamics, Inc.":"www.steeldynamics.com",
	"Jarden Corporation":"www.jarden.com",
	"Mohawk Industries, Inc.":"www.mohawkind.com",
	"Terex Corporation":"www.terex.com",
	"Northeast Utilities":"www.nu.com",
	"KBR, Inc.":"www.kbr.com",
	"Fifth Third Bancorp":"www.53.com",
	"UGI Corporation":"www.ugicorp.com",
	"CBRE Group, Inc.":"www.cbre.com",
	"Quest Diagnostics Incorporated":"www.questdiagnostics.com",
	"Peabody Energy Corporation":"www.peabodyenergy.com",
	"The Hershey Company":"www.thehersheycompany.com",
	"Boston Scientific Corporation":"www.bostonscientific.com",
	"FMC Technologies, Inc.":"www.fmctechnologies.com",
	"The Interpublic Group of Companies, Inc.":"www.interpublic.com",
	"Commercial Metals Company":"www.cmc.com",
	"The Pantry, Inc.":"www.thepantry.com",
	"Owens-Illinois, Inc.":"www.o-i.com",
	"American Family Ins. Group":"www.amfam.com",
	"Ralph Lauren Corporation":"www.ralphlauren.com",
	"Biogen Idec Inc.":"www.biogenidec.com",
	"PetSmart, Inc.":"www.petm.com",
	"Mylan Inc.":"www.mylan.com",
	"Symantec Corporation":"www.symantec.com",
	"Ameren Corporation":"www.ameren.com",
	"The Williams Companies, Inc.":"www.williams.com",
	"Barnes & Noble, Inc.":"www.barnesandnobleinc.com",
	"Huntington Ingalls Industries, Inc.":"www.huntingtoningalls.com",
	"The Priceline Group Inc.":"www.pricelinegroup.com",
	"Agilent Technologies, Inc.":"www.agilent.com",
	"Dana Holding Corporation":"www.dana.com",
	"Dillard's, Inc.":"www.dillards.com",
	"Seaboard Corporation":"www.seaboardcorp.com",
	"Vanguard Health Systems, Inc.":"www.tenethealth.com",
	"Casey's General Stores, Inc.":"www.caseys.com",
	"O'Reilly Automotive, Inc.":"www.oreillyauto.com",
	"The Blackstone Group L.P.":"www.blackstone.com",
	"Mutual of Omaha Insurance Company":"www.mutualofomaha.com",
	"Molina Healthcare, Inc.":"www.molinahealthcare.com",
	"CMS Energy Corporation":"www.cmsenergy.com",
	"Targa Resources Corp.":"www.targaresources.com",
	"Quanta Services, Inc.":"www.quantaservices.com",
	"Cablevision Systems Corporation":"www.cablevision.com",
	"Avery Dennison Corporation":"www.averydennison.com",
	"Celanese Corporation":"www.celanese.com",
	"Foot Locker, Inc.":"www.footlocker-inc.com",
	"Celgene Corporation":"www.celgene.com",
	"Advance Auto Parts, Inc.":"www.advanceautoparts.com",
	"Mattel, Inc.":"www.mattel.com",
	"Live Nation Entertainment, Inc.":"www.livenation.com",
	"General Cable Corporation":"www.generalcable.com",
	"Ryder System, Inc.":"www.ryder.com",
	"EMCOR Group, Inc.":"www.emcorgroup.com",
	"Allergan, Inc.":"www.allergan.com",
	"W.R. Berkley Corporation":"www.wrberkley.com",
	"Rockwell Automation, Inc.":"www.rockwellautomation.com",
	"NetApp, Inc.":"www.netapp.com",
	"Ingredion Incorporated":"www.ingredion.com",
	"Level 3 Communications, Inc.":"www.level3.com",
	"Calpine Corporation":"www.calpine.com",
	"Omnicare, Inc.":"www.omnicare.com",
	"Erie Insurance Group":"www.erieinsurance.com",
	"SLM Corporation":"www.salliemae.com",
	"D.R. Horton, Inc.":"www.drhorton.com",
	"CC Media Holdings, Inc.":"www.clearchannel.com",
	"Anixter International Inc.":"www.anixter.com",
	"Dick's Sporting Goods, Inc.":"www.dickssportinggoods.com",
	"SanDisk Corporation":"www.sandisk.com",
	"NCR Corporation":"www.ncr.com",
	"Starwood Hotels & Resorts Worldwide, Inc.":"www.starwoodhotels.com",
	"Expeditors International of Washington, Inc.":"www.expeditors.com",
	"Fidelity National Information Services, Inc.":"www.fisglobal.com",
	"United Natural Foods, Inc.":"www.unfi.com",
	"Auto-Owners Insurance Group":"www.auto-owners.com",
	"Windstream Holdings, Inc.":"www.windstream.com",
	"Dr Pepper Snapple Group, Inc.":"www.drpeppersnapplegroup.com",
	"Lennar Corporation":"www.lennar.com",
	"Sanmina":"www.sanmina.com",
	"Harley-Davidson, Inc.":"www.harley-davidson.com",
	"CONSOL Energy Inc.":"www.consolenergy.com",
	"The J.M. Smucker Company":"www.smucker.com",
	"Newell Rubbermaid Inc.":"www.newellrubbermaid.com",
	"CH2M HILL Companies, Ltd.":"www.ch2m.com",
	"Energy Future Holdings Corp.":"www.energyfutureholdings.com",
	"Susser Holdings Corporation":"www.susser.com",
	"Laboratory Corporation of America Holdings":"www.labcorp.com",
	"Kindred Healthcare, Inc.":"www.kindredhealthcare.com",
	"Leidos Holdings Inc.":"www.leidos.com",
	"Booz Allen Hamilton Holding Corp.":"www.boozallen.com",
	"The Jones Financial Companies,L.L.L.P.":"www.edwardjones.com",
	"Cliffs Natural Resources Inc.":"www.cliffsnaturalresources.com",
	"PulteGroup, Inc.":"www.pultegroupinc.com",
	"Regions Financial Corporation":"www.regions.com",
	"NiSource Inc.":"www.nisource.com",
	"Graybar Electric Company, Inc.":"www.graybar.com",
	"Integrys Energy Group, Inc.":"www.integrysgroup.com",
	"The Clorox Company":"www.thecloroxcompany.com",
	"Wynn Resorts, Limited":"www.wynnresorts.com",
	"The Andersons, Inc.":"www.andersonsinc.com",
	"J.B. Hunt Transport Services, Inc.":"www.jbhunt.com",
	"AK Steel Holding Corporation":"www.aksteel.com",
	"Harbinger Group Inc.":"www.harbingergroupinc.com",
	"MeadWestvaco Corporation":"www.mwv.com",
	"The Western Union Company":"www.westernunion.com",
	"The Charles Schwab Corporation":"www.aboutschwab.com",
	"Discovery Communications, Inc.":"www.discoverycommunications.com",
	"Spectra Energy Corp":"www.spectraenergy.com",
	"St. Jude Medical, Inc.":"www.sjm.com",
	"CF Industries Holdings, Inc.":"www.cfindustries.com",
	"Con-way Inc.":"www.con-way.com",
	"Old Republic International Corporation":"www.oldrepublic.com",
	"JetBlue Airways Corporation":"www.jetblue.com",
	"Calumet Specialty Products Partners, L.P.":"www.calumetspecialty.com",
	"Kelly Services, Inc.":"www.kellyservices.com",
	"Domtar Corporation":"www.domtar.com",
	"Murphy Oil Corporation":"www.murphyoilcorp.com",
	"Harris Corporation":"www.harris.com",
	"Asbury Automotive Group, Inc.":"www.asburyauto.com",
	"Big Lots, Inc.":"www.biglots.com",
	"Advanced Micro Devices, Inc.":"www.amd.com",
	"Owens Corning":"www.owenscorning.com",
	"Realogy Holdings Corp.":"www.realogy.com",
	"Host Hotels & Resorts, Inc.":"www.hosthotels.com",
	"MRC Global Inc.":"www.mrcglobal.com",
	"Simon Property Group, Inc.":"www.simon.com",
	"Tractor Supply Company":"www.tractorsupply.com",
	"Gannett Co., Inc.":"www.gannett.com",
	"Alaska Air Group, Inc.":"www.alaskaair.com",
	"Insight Enterprises, Inc.":"www.insight.com",
	"McGraw Hill Financial, Inc.":"www.mhfi.com",
	"Buckeye Partners, L.P.":"www.buckeye.com",
	"Quintiles Transnational Holdings Inc.":"www.quintiles.com",
	"American Financial Group, Inc.":"www.afginc.com",
	"United Stationers Inc.":"www.unitedstationers.com",
	"Coach, Inc.":"www.coach.com",
	"LKQ Corporation":"www.lkqcorp.com",
	"Noble Energy, Inc.":"www.nobleenergyinc.com",
	"Bemis Company, Inc.":"www.bemis.com",
	"Joy Global Inc.":"www.joyglobal.com",
	"Wyndham Worldwide Corporation":"www.wyndhamworldwide.com",
	"NII Holdings, Inc.":"www.nii.com",
	"Lorillard, Inc.":"www.lorillard.com",
	"Alleghany Corporation":"www.alleghany.com",
	"Airgas, Inc.":"www.airgas.com",
	"First American Financial Corporation":"www.firstam.com",
	"United Rentals, Inc.":"www.ur.com"
}

var extraSubjectNames = {
	'2.5.4.15':'businessCategory',
	'2.5.4.9':'streetAddress',
	'2.5.4.8':'stateOrProvinceName',
	'2.5.4.6':'countryName',
	'1.3.6.1.4.1.311.60.2.1.1':'jurisdictionOfIncorporationLocalityName',
	'1.3.6.1.4.1.311.60.2.1.2':'jurisdictionOfIncorporationStateOrProvinceName',
	'1.3.6.1.4.1.311.60.2.1.3':'jurisdictionOfIncorporationCountryName'
}

var getCertificateSubject = function(hostname, cb){
	request('https://'+hostname, {
		timeout: 60 * 1000,
		// followRedirect: false,
		maxRedirects: 3
	}, function (err, res, body) {
		if ( err ) {
			return cb(err)
		}
		// Looks like some sites redirect to HTTP, so don't have getPeerCertificate
		var subject = res.req.connection.getPeerCertificate && res.req.connection.getPeerCertificate().subject;
		if ( subject ) {
			// Node doesn't know about all x509 IDs
			var cleanSubject = {}
			Object.keys(subject).forEach(function(heading){
				var cleanHeading = extraSubjectNames[heading]
				if ( cleanHeading ) {
					cleanSubject[cleanHeading] = subject[heading]
					return
				}
				cleanSubject[heading] = subject[heading]
				return
			})

			return cb(null, cleanSubject)
		}
		return cb('No connection or no subject')
	})
}

var remaining = Object.keys(fortune500).length;

var results = []

Object.keys(fortune500).forEach(function(company, index){

	var site = fortune500[company]
	getCertificateSubject(site, function(err, subject){
		var result = {
			name: company,
			site: site,
			position: index,
			isSSL: false
		}
		if ( ! err ) {
			result.isSSL = true;
			result.certificateSubject = subject;
			result.isEV = !! ( subject && subject.jurisdictionOfIncorporationCountryName );
		}
		results.push(result);
		remaining--;
		if ( ! remaining ) {
			fs.writeFileSync('results.json', JSON.stringify(results, null, 2))
			log('Complete.')
		}
	})
})


