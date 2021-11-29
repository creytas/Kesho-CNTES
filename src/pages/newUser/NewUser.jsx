import { Link as RouterLink, Route, Navigate, useLocation } from 'react-router-dom';
import Gender from '../../components/genderRadio/Gender';
import Input from '../../components/inputField/Input';
import SelectThree from '../../components/select/SelectThree';
import SelectTwo from '../../components/select/SelectTwo';
import SelectFour from '../../components/select/SelectFour';
import SelectFive from '../../components/select/SelectFive';
import SelectSix from '../../components/select/SelectSix';
import SelectTen from '../../components/select/SelectTen';
import YesNoOther from '../../components/yesNoOther/YesNoOther';
import YesNoOtherTwo from '../../components/yesNoOther/YesNoOtherTwo';
import './newUser.css';
import Upload from '../../components/uploadPhoto/Upload';
import { fakeAuth } from '../../fakeAuth';

export default function NewUser() {
  const location = useLocation();
  return fakeAuth.isAuthenticated ? (
    <div className="newUser">
      <h1 className="newUserTitle">Nouveau patient</h1>
      <br />
      <form className="newUserForm">
        <div className="patients">
          <h3>Infos sur le patient</h3>
          <Input label="Nom du patient" placeholder="Nom" type="text" />
          <Input label="Post-nom du patient" placeholder="Post-nom" type="text" />
          <Input label="Prénom du patient" placeholder="Prénom" type="text" />
          <Input label="Date de naissance" type="date" />
          <SelectFour
            label="Commune de provenance"
            value1="Kadutu"
            value2="Bagira"
            value3="Ibanda"
            value4="Hors ville"
          />
          <Input
            label="Addresse du patient, si hors ville"
            placeholder="Avénue, Numéro, Quartier, Commune, Ville"
          />
          <YesNoOther
            title="Mode d'arrivée"
            type="text"
            yes="De la maison"
            no="UNT"
            placeholder="Si autre, à preciser ici"
          />
          <Input label="Poids de naissance(gramme)" placeholder="2300" />
          <Input
            label="portable"
            type="tel"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}-[0-9]{3}"
            placeholder="081 71 89 433"
          />
          <Gender />
          <br />
          <br />
        </div>

        <div className="anthropometrie">
          <h3>Paramètres anthropométriques</h3>
          <Input label="Taille du patient(centimètre)" placeholder="152.4" type="number" />
          <Input label="Périmetre brachial(centimètre)" placeholder="11" type="number" />
          <Input label="Périmetre cranien(centimètre)" placeholder="40" type="number" />
          <Input label="Poids(kilogramme)" placeholder="40" type="number" />
          <SelectThree
            label="Type de malnutrition"
            value3="Forme légère de malnutrition "
            value1="Malnutrition aigue sévère(MAS)"
            value2="Malnutrition aigue sévère(MAS)"
          />
          <br />
          <br />
          <br />
          <div className="upload">
            <Upload />
          </div>
          <br />
          <br />
        </div>

        <div className="amnesie">
          <h3>Probables causes de malnutrition</h3>
          <SelectTwo label="Antécédent de MAS " value1="Oui" value2="Non" />
          <Input label="Nombre de rechutes" placeholder="2" type="number" min="0" />
          <SelectTwo label="Malnutrition dans la fratrie" value1="Oui" value2="Non" />
          <SelectTwo label="Terme de la grossèsse " value1="Prématuré" value2="A terme" />
          <SelectTwo label="Séjour en néonat" value1="Oui" value2="Non" />
          <Input label="EIG moyen" placeholder="année" type="number" min="0" />
          <SelectTwo
            label="Lieu d'accouchement"
            value1="Structure sanitaire"
            value2="Autre(voiture, domicile)"
          />
          <SelectTwo
            label="Asphyxie périnatale"
            value1="Oui(a crié spontanément"
            value2="Nom(pas de cri ou cri après reanimation)"
          />
          <YesNoOther
            title="DPM"
            type="text"
            yes="Normal"
            no="Anormal"
            placeholder="Si DPM anormal, ecrire la raison ici"
          />
          <YesNoOther
            title="Calendrier vaccinal"
            type="text"
            yes="A jour"
            no="Non à jour"
            placeholder="Si non à jour, préciser les vaccins non reçu espacés par une virgule"
          />
          <Input label="Rang dans la fratrie" placeholder="Né(e) après 3 enfants" type="text" />
          <Input label="Taille de la fratrie" placeholder="4" type="number" min="0" />
          <SelectTwo label="Vaccination rougeole" value1="Oui" value2="Non" />
          <YesNoOther
            title="Allaitement maternel exclusif jusqu’à 6 mois "
            type="number"
            min="0"
            yes="Oui"
            no="Non"
            placeholder="Si non, à quel âge en"
          />
          <SelectTwo label="Antécédent rougeole dans la fratrie" value1="Oui" value2="Non" />
          <SelectTwo label="Terrain VIH connu" value1="Oui" value2="Non" />
          <SelectTwo label="TBC" value1="Oui" value2="Non" />
          <SelectTwo label="Antécédent TBC dans la fratrie" value1="Oui" value2="Non" />
          <YesNoOther
            title="Notion d'hospitalisation récente"
            type="text"
            yes="Oui"
            no="Non"
            placeholder="Si oui, diagnostic"
          />
          <YesNoOther
            title="Notion de prise des produits à base des plantes"
            type="number"
            min="0"
            yes="Oui"
            no="Non"
            placeholder="Si oui, durée en mois"
          />
          <YesNoOther
            title="Notion de prise de cocktail d'ATB appélé 'Machangé'"
            type="number"
            min="0"
            yes="Oui"
            no="Non"
            placeholder="Si oui, durée en mois"
          />
          <YesNoOtherTwo
            title="Traitement nutritionnel"
            type="number"
            min="0"
            one="APT 2"
            two="Plumpy-nut"
            three="Autres"
            placeholder="Si autres, preciser"
          />
          <Input
            label="Diversification à quel age(en mois)"
            placeholder="36"
            type="number"
            min="0"
          />
          <div className="newUserItem">
            <p>Constitution/Type d'aliment</p>
            <textarea type="" placeholder="" />
          </div>
          <br />
          <br />
        </div>

        <div>
          <h3>Infos sur la famille</h3>
          <Input label="Taille du ménage" placeholder="4" type="number" min="0" />
          <SelectTwo label="Vit avec ses 2 parents" value1="Oui" value2="Non" />
          <Input label="Nom complet du tuteur" placeholder="Nom tuteur" type="text" />
          <Input label="Date de naissance du tuteur" type="date" />
          <SelectFour
            label="Mère enceinte"
            value1="Oui"
            value2="Allaitante"
            value3="Les deux"
            value4="Aucun"
          />
          <SelectTwo label="Père en vie" value1="Oui" value2="Non" />
          <SelectTwo label="Mère en vie" value1="Oui" value2="Non" />
          <Input label="Age de la mère" placeholder="27" type="number" min="0" />
          <SelectSix
            label="Profession mère"
            value1="Salariée formelle(infirmière, enseignante, ONG.)"
            value2="Travail à temps partiel (maçon, menuisière)"
            value3="Business (exploitante minier, petit commerce, etc.)"
            value4="Cultivatrice"
            value5="Ménagère"
            value6="Autres"
          />
          <SelectSix
            label="Profession du chef du ménage"
            value1="Salarié formelle(infirmier, enseignant, ONG.)"
            value2="Travail à temps partiel (maçon, menuisier)"
            value3="Business (exploitant minier, petit commerce, etc.)"
            value4="Cultivateur"
            value5="Militaire/Policier"
            value6="Sans profession(sans emploi)"
          />
          <SelectFive
            label="Scolarité mère"
            value1="Analphabète"
            value2="Primaire"
            value3="Secondaire"
            value4="Universitaire"
            value5="Professionnelle"
          />
          <SelectTwo label="Contraception par la mère" value1="Oui" value2="Non" />
          <SelectTwo label="Si contraception" value1="Naturelle" value2="Moderne" />
          <SelectFive
            label="Si contraception naturelle"
            value1="Abstinence périodique"
            value2="Coït interrompu"
            value3="Température basale"
            value4="Glaire cervicale"
            value5="MAMA"
          />
          <SelectTen
            label="Si contraception moderne"
            value1="contraceptifs oraux et combiné ou pilule"
            value2="implants"
            value3="contraceptif injectable à progestatifs seuls"
            value4="contraceptif injectable mensuel"
            value5="patch contraceptif combiné et anneau contraceptif intra vaginal"
            value6="Dispositif intra-utérin"
            value7="Préservatif masculin et féminin"
            value8="Contraceptif d’urgence"
            value9="Ligature tubaire"
            value10="Vasectomie"
          />
          <SelectThree
            label="Niveau socio-économique"
            value3="Bon(supérieur à 5$)"
            value1="Bas(inférieur à 1$)"
            value2="Moyen(entre 1 et 5$)"
          />
          <SelectFour
            label="Statut marital"
            value1="Jamais mariée"
            value2="Mariée"
            value3="Separée ou divorcée"
            value4="Veuve"
          />
          <YesNoOther
            title="Si mariée"
            type="number"
            yes="Monogamie"
            no="Polygamie"
            placeholder="Si polygamie, nombre des femmes du père"
          />
          <SelectFive
            label="Tribu"
            value1="Shi"
            value2="Rega"
            value3="Havu"
            value4="Autre ethnie du Sud-Kivu"
            value5="Autre ethnie du pays et autres"
          />
          <SelectFour
            label="Religion"
            value1="Catholique"
            value2="Protestant"
            value3="Musulman"
            value4="Autres"
          />
          <SelectTwo label="Possession radio et/ou poste téléviseur" value1="Oui" value2="Non" />
          <Input label="Nombre de repas par jour" placeholder="1" type="number" min="0" />
          <SelectTwo label="Consommation du poisson" value1="Oui" value2="Non" />
          <YesNoOther
            title="Prise recente d'ATB"
            type="text"
            yes="Oui"
            no="Non"
            placeholder="Si oui, lequels"
          />
          <SelectTwo label="TBC chez les parents" value1="Oui" value2="Non" />
          <SelectThree label="Si Oui, chez" value3="Père et Mère" value1="Père" value2="Mère" />
          <YesNoOther
            title="TBC traitée"
            type="number"
            yes="Oui"
            no="Non"
            placeholder="Si oui, pendant quelle durée(en mois)"
          />
          <SelectTwo label="TBC declaré fini" value1="Oui" value2="Non" />
        </div>
      </form>
      <div className="btn">
        <Link to="/newUser">
          <button className="userAddButton">Créer</button>
        </Link>
      </div>
    </div>
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
}
